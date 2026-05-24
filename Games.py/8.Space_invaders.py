"""
PROJECT 8: Space Invaders Clone
=================================
Concepts: pygame sprites, sprite groups, collision detection,
          enemy movement patterns, shooting mechanics, game states

Install pygame first:  pip install pygame
"""

import pygame
import random
import sys

# ── Config ────────────────────────────────────────────────────────────────────

WIDTH, HEIGHT = 800, 600
FPS           = 60

# Colors
BLACK      = (5,   5,   15)
WHITE      = (240, 240, 240)
GREEN      = (80,  220,  80)
RED        = (220,  60,  60)
CYAN       = (80,  220, 220)
YELLOW     = (220, 220,  60)
DARK_GRAY  = (40,   40,  50)

PLAYER_SPEED  = 5
BULLET_SPEED  = 8
ENEMY_ROWS    = 4
ENEMY_COLS    = 10
ENEMY_SPACING = 60
SHOOT_COOLDOWN = 300  # ms between player shots


# ── Sprite classes ────────────────────────────────────────────────────────────

class Player(pygame.sprite.Sprite):
    """The player-controlled ship."""

    def __init__(self):
        super().__init__()
        # Draw the ship programmatically (triangle)
        self.image = pygame.Surface((40, 30), pygame.SRCALPHA)
        pygame.draw.polygon(self.image, CYAN,
                            [(20, 0), (0, 28), (40, 28)])
        pygame.draw.polygon(self.image, WHITE,
                            [(20, 4), (4, 26), (36, 26)], 2)
        self.rect = self.image.get_rect(midbottom=(WIDTH // 2, HEIGHT - 20))
        self.last_shot = 0

    def update(self, keys):
        if keys[pygame.K_LEFT]  and self.rect.left  > 0:
            self.rect.x -= PLAYER_SPEED
        if keys[pygame.K_RIGHT] and self.rect.right < WIDTH:
            self.rect.x += PLAYER_SPEED

    def can_shoot(self):
        return pygame.time.get_ticks() - self.last_shot > SHOOT_COOLDOWN

    def shoot(self):
        self.last_shot = pygame.time.get_ticks()
        return Bullet(self.rect.centerx, self.rect.top, -BULLET_SPEED, YELLOW)


class Enemy(pygame.sprite.Sprite):
    """An alien invader. Row determines appearance and points."""

    COLORS = [RED, (200, 80, 200), GREEN, CYAN]

    def __init__(self, col, row):
        super().__init__()
        color = Enemy.COLORS[row % len(Enemy.COLORS)]
        self.image = pygame.Surface((36, 26), pygame.SRCALPHA)

        # Simple alien body
        pygame.draw.ellipse(self.image, color, (4, 8, 28, 16))
        pygame.draw.rect(self.image, color, (10, 4, 16, 10))

        # Antennae
        pygame.draw.line(self.image, color, (10, 4), (4, 0), 2)
        pygame.draw.line(self.image, color, (26, 4), (32, 0), 2)

        # Eyes
        pygame.draw.circle(self.image, BLACK, (13, 14), 3)
        pygame.draw.circle(self.image, BLACK, (23, 14), 3)

        self.rect   = self.image.get_rect()
        self.points = (ENEMY_ROWS - row) * 10   # top rows worth more

    def shoot(self):
        return Bullet(self.rect.centerx, self.rect.bottom, BULLET_SPEED // 2, RED)


class Bullet(pygame.sprite.Sprite):
    """A projectile."""

    def __init__(self, x, y, speed, color):
        super().__init__()
        self.image = pygame.Surface((4, 14), pygame.SRCALPHA)
        pygame.draw.rect(self.image, color, (1, 0, 2, 14), border_radius=2)
        self.rect  = self.image.get_rect(centerx=x, top=y)
        self.speed = speed

    def update(self):
        self.rect.y += self.speed
        if self.rect.bottom < 0 or self.rect.top > HEIGHT:
            self.kill()   # remove from all sprite groups


class Shield(pygame.sprite.Sprite):
    """A destructible shield block."""

    def __init__(self, x, y):
        super().__init__()
        self.image = pygame.Surface((20, 14))
        self.image.fill(GREEN)
        self.rect  = self.image.get_rect(topleft=(x, y))
        self.hits  = 3   # takes 3 hits to destroy

    def hit(self):
        self.hits -= 1
        # Fade the shield color as it takes damage
        alpha = int(255 * self.hits / 3)
        self.image.set_alpha(alpha)
        if self.hits <= 0:
            self.kill()


# ── Game class ────────────────────────────────────────────────────────────────

class Game:

    def __init__(self):
        pygame.init()
        self.screen = pygame.display.set_mode((WIDTH, HEIGHT))
        pygame.display.set_caption("👾 Space Invaders")
        self.font   = pygame.font.SysFont("monospace", 20, bold=True)
        self.big    = pygame.font.SysFont("monospace", 42, bold=True)
        self.clock  = pygame.time.Clock()
        self.reset()

    def reset(self):
        """Initialise / reset all game state."""
        self.score = 0
        self.lives = 3
        self.level = 1
        self.game_over = False

        # Sprite groups
        self.all_sprites    = pygame.sprite.Group()
        self.enemies        = pygame.sprite.Group()
        self.player_bullets = pygame.sprite.Group()
        self.enemy_bullets  = pygame.sprite.Group()
        self.shields        = pygame.sprite.Group()

        # Player
        self.player = Player()
        self.all_sprites.add(self.player)

        # Enemy grid
        self.enemy_dir   = 1     # 1 = right, -1 = left
        self.enemy_speed = 1
        self.drop_dist   = 20    # pixels to drop when hitting a wall
        self.spawn_enemies()

        # Shields
        for sx in [150, 310, 470, 630]:
            for bx in range(5):
                for by in range(3):
                    s = Shield(sx + bx * 22, HEIGHT - 120 + by * 16)
                    self.shields.add(s)
                    self.all_sprites.add(s)

        self.enemy_shoot_timer = pygame.time.get_ticks()
        self.enemy_shoot_interval = 1200  # ms

    def spawn_enemies(self):
        """Create the enemy grid."""
        for row in range(ENEMY_ROWS):
            for col in range(ENEMY_COLS):
                e = Enemy(col, row)
                e.rect.topleft = (80 + col * ENEMY_SPACING,
                                  60 + row * 50)
                self.enemies.add(e)
                self.all_sprites.add(e)

    def move_enemies(self):
        """Move all enemies together; reverse + drop when hitting a wall."""
        if not self.enemies: return

        # Check if any enemy has hit a wall
        hit_wall = any(
            (e.rect.right >= WIDTH - 10 and self.enemy_dir == 1) or
            (e.rect.left  <= 10         and self.enemy_dir == -1)
            for e in self.enemies
        )

        if hit_wall:
            self.enemy_dir  *= -1
            for e in self.enemies:
                e.rect.y += self.drop_dist
        else:
            for e in self.enemies:
                e.rect.x += self.enemy_speed * self.enemy_dir

    def enemy_shoot(self):
        """Randomly pick a front-row enemy to shoot."""
        now = pygame.time.get_ticks()
        if now - self.enemy_shoot_timer < self.enemy_shoot_interval:
            return
        self.enemy_shoot_timer = now

        if self.enemies:
            shooter = random.choice(list(self.enemies))
            b = shooter.shoot()
            self.enemy_bullets.add(b)
            self.all_sprites.add(b)

    def handle_collisions(self):
        """Check all bullet/sprite collisions."""
        # Player bullets vs enemies
        hits = pygame.sprite.groupcollide(
            self.enemies, self.player_bullets, True, True)
        for enemy in hits:
            self.score += enemy.points

        # Enemy bullets vs player
        if pygame.sprite.spritecollide(self.player, self.enemy_bullets, True):
            self.lives -= 1
            if self.lives <= 0:
                self.game_over = True

        # Bullets vs destructible shields (FIXED)
        p_shield_hits = pygame.sprite.groupcollide(
            self.shields, self.player_bullets, False, True)
        for shield in p_shield_hits:
            shield.hit()

        e_shield_hits = pygame.sprite.groupcollide(
            self.shields, self.enemy_bullets, False, True)
        for shield in e_shield_hits:
            shield.hit()

        # Enemies reached the bottom → game over
        for e in self.enemies:
            if e.rect.bottom >= HEIGHT - 60:
                self.game_over = True

    def draw_hud(self):
        score_txt = self.font.render(f"Score: {self.score}", True, WHITE)
        lives_txt = self.font.render(f"Lives: {'❤ ' * self.lives}", True, RED)
        level_txt = self.font.render(f"Level: {self.level}", True, CYAN)
        self.screen.blit(score_txt, (10, 8))
        self.screen.blit(lives_txt, (WIDTH // 2 - 60, 8))
        self.screen.blit(level_txt, (WIDTH - 110, 8))

        # Bottom line
        pygame.draw.line(self.screen, DARK_GRAY, (0, HEIGHT - 60), (WIDTH, HEIGHT - 60), 2)

    def run(self):
        while True:
            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    pygame.quit(); sys.exit()
                if event.type == pygame.KEYDOWN:
                    if self.game_over and event.key == pygame.K_r:
                        self.reset()

            if not self.game_over:
                keys = pygame.key.get_pressed()
                self.player.update(keys)

                # Shooting
                if keys[pygame.K_SPACE] and self.player.can_shoot():
                    b = self.player.shoot()
                    self.player_bullets.add(b)
                    self.all_sprites.add(b)

                self.player_bullets.update()
                self.enemy_bullets.update()
                self.move_enemies()
                self.enemy_shoot()
                self.handle_collisions()

                # Level up when all enemies cleared
                if not self.enemies:
                    self.level += 1
                    self.enemy_speed = min(self.enemy_speed + 1, 5)
                    self.enemy_shoot_interval = max(400, self.enemy_shoot_interval - 100)
                    self.spawn_enemies()

            # ── Draw ──────────────────────────────────────────────────────────
            self.screen.fill(BLACK)
            self.all_sprites.draw(self.screen)
            self.draw_hud()

            if self.game_over:
                msg  = self.big.render("GAME OVER", True, RED)
                msg2 = self.font.render(f"Final Score: {self.score}   R = restart", True, WHITE)
                self.screen.blit(msg,  (WIDTH//2 - msg.get_width()//2,  HEIGHT//2 - 40))
                self.screen.blit(msg2, (WIDTH//2 - msg2.get_width()//2, HEIGHT//2 + 20))

            pygame.display.flip()
            self.clock.tick(FPS)


if __name__ == "__main__":
    Game().run()