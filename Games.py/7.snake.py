"""
PROJECT 7: Snake
=================
Concepts: pygame game loop, event handling, grid-based movement,
          deque (efficient queue), collision detection, rendering

Install pygame first:  pip install pygame
"""

import pygame
import random
from collections import deque   # deque = double-ended queue, perfect for a snake

# ── Config ────────────────────────────────────────────────────────────────────

CELL   = 20          # size of each grid cell in pixels
COLS   = 30          # number of columns
ROWS   = 25          # number of rows
WIDTH  = COLS * CELL
HEIGHT = ROWS * CELL
FPS    = 10          # frames per second (= snake speed)

# Colors (R, G, B)
BLACK      = (10,  10,  10)
GREEN      = (80, 200,  80)
DARK_GREEN = (40, 140,  40)
RED        = (220,  60,  60)
WHITE      = (240, 240, 240)
GRAY       = (50,   50,  50)

# Direction vectors
UP    = (0, -1)
DOWN  = (0,  1)
LEFT  = (-1, 0)
RIGHT = (1,  0)


# ── Helper: draw a rounded cell ───────────────────────────────────────────────

def draw_cell(surface, col, row, color, shrink=2):
    """Draw a colored square at grid position (col, row) with a small margin."""
    rect = pygame.Rect(col * CELL + shrink, row * CELL + shrink,
                       CELL - shrink * 2, CELL - shrink * 2)
    pygame.draw.rect(surface, color, rect, border_radius=4)


# ── Main game ─────────────────────────────────────────────────────────────────

def main():
    pygame.init()
    screen = pygame.display.set_mode((WIDTH, HEIGHT))
    pygame.display.set_caption("🐍 Snake")
    clock  = pygame.time.Clock()
    font   = pygame.font.SysFont("monospace", 22, bold=True)
    big_font = pygame.font.SysFont("monospace", 36, bold=True)

    def new_game():
        """Return fresh game state."""
        start = (COLS // 2, ROWS // 2)
        # deque stores the snake body; leftmost = head
        snake = deque([start, (start[0]-1, start[1]), (start[0]-2, start[1])])
        direction = RIGHT
        food = spawn_food(snake)
        return snake, direction, food, 0  # snake, dir, food, score

    def spawn_food(snake):
        """Place food on a random empty cell."""
        snake_set = set(snake)
        while True:
            pos = (random.randint(0, COLS-1), random.randint(0, ROWS-1))
            if pos not in snake_set:
                return pos

    snake, direction, food, score = new_game()
    game_over = False
    pending_dir = direction   # buffer direction input

    while True:
        # ── Event handling ────────────────────────────────────────────────────
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                return

            if event.type == pygame.KEYDOWN:
                if game_over:
                    if event.key == pygame.K_r:
                        snake, direction, food, score = new_game()
                        game_over = False
                        pending_dir = RIGHT
                else:
                    # Prevent reversing into yourself
                    if event.key == pygame.K_UP    and direction != DOWN:
                        pending_dir = UP
                    elif event.key == pygame.K_DOWN  and direction != UP:
                        pending_dir = DOWN
                    elif event.key == pygame.K_LEFT  and direction != RIGHT:
                        pending_dir = LEFT
                    elif event.key == pygame.K_RIGHT and direction != LEFT:
                        pending_dir = RIGHT

        if not game_over:
            direction = pending_dir
            head = snake[0]
            new_head = (head[0] + direction[0], head[1] + direction[1])

            # ── Collision detection ───────────────────────────────────────────
            hit_wall = not (0 <= new_head[0] < COLS and 0 <= new_head[1] < ROWS)
            hit_self = new_head in set(snake)

            if hit_wall or hit_self:
                game_over = True
            else:
                snake.appendleft(new_head)   # grow head

                if new_head == food:
                    score += 1
                    food = spawn_food(snake)
                    # Speed up every 5 points
                    if score % 5 == 0:
                        FPS_current = min(FPS + score // 5 * 2, 25)
                else:
                    snake.pop()              # remove tail (normal move)

        # ── Drawing ───────────────────────────────────────────────────────────
        screen.fill(BLACK)

        # Draw grid lines (subtle)
        for x in range(0, WIDTH, CELL):
            pygame.draw.line(screen, GRAY, (x, 0), (x, HEIGHT))
        for y in range(0, HEIGHT, CELL):
            pygame.draw.line(screen, GRAY, (0, y), (WIDTH, y))

        # Draw food
        draw_cell(screen, food[0], food[1], RED, shrink=3)

        # Draw snake (head slightly brighter)
        for i, (col, row) in enumerate(snake):
            color = GREEN if i > 0 else DARK_GREEN
            draw_cell(screen, col, row, color)

        # HUD
        score_surf = font.render(f"Score: {score}", True, WHITE)
        screen.blit(score_surf, (8, 8))

        if game_over:
            overlay = pygame.Surface((WIDTH, HEIGHT), pygame.SRCALPHA)
            overlay.fill((0, 0, 0, 140))
            screen.blit(overlay, (0, 0))

            msg  = big_font.render("GAME OVER", True, RED)
            msg2 = font.render(f"Score: {score}   Press R to restart", True, WHITE)
            screen.blit(msg,  (WIDTH//2 - msg.get_width()//2,  HEIGHT//2 - 40))
            screen.blit(msg2, (WIDTH//2 - msg2.get_width()//2, HEIGHT//2 + 20))

        pygame.display.flip()
        clock.tick(FPS)


if __name__ == "__main__":
    main()