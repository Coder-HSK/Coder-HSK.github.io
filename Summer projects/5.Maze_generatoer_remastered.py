"""
PROJECT 5: Maze Generator — PLAYABLE VERSION
=============================================
Move with WASD or arrow keys.
Press R to regenerate a new maze.
Press Q to quit.

Uses Python's built-in `curses` library for real-time key input.
Works on Mac/Linux. On Windows, install windows-curses first:
    pip install windows-curses
"""
import curses
import random

# ── Cell types ────────────────────────────────────────────────────────────────

WALL     = "█"
PATH     = " "
START    = "S"
END      = "E"
PLAYER   = "●"
VISITED  = "·"   # tiles the player has walked over


# ── Maze Generation (same recursive DFS as before) ────────────────────────────

def generate_maze(rows, cols):
    height = rows * 2 + 1
    width  = cols * 2 + 1
    grid = [[WALL] * width for _ in range(height)]

    def carve(r, c):
        grid[r * 2 + 1][c * 2 + 1] = PATH
        directions = [(0,1),(0,-1),(1,0),(-1,0)]
        random.shuffle(directions)
        for dr, dc in directions:
            nr, nc = r + dr, c + dc
            if 0 <= nr < rows and 0 <= nc < cols:
                wr = r * 2 + 1 + dr
                wc = c * 2 + 1 + dc
                if grid[nr * 2 + 1][nc * 2 + 1] == WALL:
                    grid[wr][wc] = PATH
                    carve(nr, nc)

    carve(0, 0)
    grid[1][1]               = START
    grid[height - 2][width - 2] = END
    return grid


# ── Rendering ─────────────────────────────────────────────────────────────────

# curses color pair IDs
COLOR_WALL    = 1
COLOR_PATH    = 2
COLOR_START   = 3
COLOR_END     = 4
COLOR_PLAYER  = 5
COLOR_VISITED = 6
COLOR_HUD     = 7

def init_colors():
    curses.start_color()
    curses.use_default_colors()
    curses.init_pair(COLOR_WALL,    curses.COLOR_BLUE,    -1)
    curses.init_pair(COLOR_PATH,    curses.COLOR_WHITE,   -1)
    curses.init_pair(COLOR_START,   curses.COLOR_GREEN,   -1)
    curses.init_pair(COLOR_END,     curses.COLOR_RED,     -1)
    curses.init_pair(COLOR_PLAYER,  curses.COLOR_YELLOW,  -1)
    curses.init_pair(COLOR_VISITED, curses.COLOR_CYAN,    -1)
    curses.init_pair(COLOR_HUD,     curses.COLOR_WHITE,   -1)


CELL_COLORS = {
    WALL:    COLOR_WALL,
    PATH:    COLOR_PATH,
    START:   COLOR_START,
    END:     COLOR_END,
    PLAYER:  COLOR_PLAYER,
    VISITED: COLOR_VISITED,
}

def draw_maze(stdscr, grid, player_pos, moves, won):
    stdscr.erase()
    max_y, max_x = stdscr.getmaxyx()

    pr, pc = player_pos  # player's current row, col in the display grid

    for r, row in enumerate(grid):
        if r >= max_y - 2:   # leave room for HUD at bottom
            break
        for c, cell in enumerate(row):
            if c >= max_x:
                break

            # Show player on top of whatever cell they're standing on
            ch    = PLAYER if (r == pr and c == pc) else cell
            color = CELL_COLORS.get(ch, COLOR_PATH)

            try:
                stdscr.addch(r, c, ch, curses.color_pair(color))
            except curses.error:
                pass   # ignore write to bottom-right corner edge case

    # HUD line at the bottom
    hud = f"  Moves: {moves}   WASD/Arrows=move  R=new maze  Q=quit"
    if won:
        hud = f"  🎉 YOU WIN!  Moves: {moves}   R=new maze  Q=quit"
    try:
        stdscr.addstr(max_y - 1, 0,
                      hud[:max_x - 1],
                      curses.color_pair(COLOR_HUD) | curses.A_BOLD)
    except curses.error:
        pass

    stdscr.refresh()


# ── Main game loop ─────────────────────────────────────────────────────────────

def play(stdscr, rows, cols):
    curses.curs_set(0)      # hide the blinking cursor
    init_colors()

    def new_game():
        grid  = generate_maze(rows, cols)
        # Player starts at the S tile (always row=1, col=1)
        pos   = (1, 1)
        moves = 0
        won   = False
        return grid, pos, moves, won

    grid, player_pos, moves, won = new_game()

    # Key mappings → (row_delta, col_delta)
    MOVE_KEYS = {
        ord('w'):          (-1, 0),
        ord('a'):          (0, -1),
        ord('s'):          (1,  0),
        ord('d'):          (0,  1),
        curses.KEY_UP:     (-1, 0),
        curses.KEY_LEFT:   (0, -1),
        curses.KEY_DOWN:   (1,  0),
        curses.KEY_RIGHT:  (0,  1),
    }

    while True:
        draw_maze(stdscr, grid, player_pos, moves, won)

        key = stdscr.getch()   # wait for a keypress (non-blocking if needed)

        if key in (ord('q'), ord('Q')):
            break

        if key in (ord('r'), ord('R')):
            grid, player_pos, moves, won = new_game()
            continue

        if won:
            continue   # freeze movement after winning until R or Q

        if key in MOVE_KEYS:
            dr, dc    = MOVE_KEYS[key]
            nr, nc    = player_pos[0] + dr, player_pos[1] + dc
            num_rows  = len(grid)
            num_cols  = len(grid[0])

            # Only move if the destination is not a wall and is in bounds
            if (0 <= nr < num_rows and 0 <= nc < num_cols
                    and grid[nr][nc] != WALL):

                # Leave a breadcrumb on the tile we're leaving
                cur_r, cur_c = player_pos
                if grid[cur_r][cur_c] not in (START, END):
                    grid[cur_r][cur_c] = VISITED

                player_pos = (nr, nc)
                moves += 1

                # Check win condition
                if grid[nr][nc] == END:
                    won = True


# ── Entry point ───────────────────────────────────────────────────────────────

def main():
    print("🌀  PLAYABLE MAZE")
    try:
        rows = int(input("Maze height (cells, e.g. 10): ") or 10)
        cols = int(input("Maze width  (cells, e.g. 20): ") or 20)
    except ValueError:
        rows, cols = 10, 20

    print("\nStarting... (make your terminal full-screen for best experience!)")
    input("Press Enter to begin.")

    # curses.wrapper handles setup/teardown and restores the terminal on crash
    curses.wrapper(play, rows, cols)
    print("Thanks for playing! 👋")


if __name__ == "__main__":
    main()