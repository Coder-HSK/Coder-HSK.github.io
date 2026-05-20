"""
PROJECT 5: Maze Generator & Solver
=====================================
Concepts: 2D lists, recursion, depth-first search (DFS), stacks,
          algorithm design, terminal rendering

The maze is generated with Recursive Backtracking DFS, then solved
with iterative DFS.  Run it and watch the maze appear!
"""

import random
import os
import time


# ── Constants ──────────────────────────────────────────────────────────────────

WALL = "█"
PATH = " "
START = "S"
END   = "E"
CRUMB = "·"   # breadcrumb left by the solver
SOLUTION = "★"


def clear():
    #Clear the terminal screen.
    os.system("cls" if os.name == "nt" else "clear")


# ── Maze Generation (Recursive Backtracking) ───────────────────────────────────

def generate_maze(rows, cols):
   # Create a 2D grid filled with walls, then carve out passages using
   # recursive backtracking depth-first search.

   # Grid layout: every cell (r, c) in our logical grid maps to
   # position (r*2+1, c*2+1) in the display grid, giving room for walls.
    # Display grid: all walls to start
    height = rows * 2 + 1
    width  = cols * 2 + 1
    grid = [[WALL] * width for _ in range(height)]

    def carve(r, c):
        #Recursively carve passages from cell (r, c).
        # Mark this logical cell as open
        grid[r * 2 + 1][c * 2 + 1] = PATH

        # Visit neighbors in random order
        directions = [(0,1),(0,-1),(1,0),(-1,0)]
        random.shuffle(directions)

        for dr, dc in directions:
            nr, nc = r + dr, c + dc
            if 0 <= nr < rows and 0 <= nc < cols:
                # Wall between (r,c) and (nr,nc)
                wr = r * 2 + 1 + dr
                wc = c * 2 + 1 + dc
                if grid[nr * 2 + 1][nc * 2 + 1] == WALL:
                    grid[wr][wc] = PATH       # knock down the wall
                    carve(nr, nc)             # recurse into neighbor

    carve(0, 0)

    # Place Start and End
    grid[1][1]               = START
    grid[height - 2][width - 2] = END

    return grid


def print_maze(grid, color=True):
    """Render the maze to the terminal."""
    colors = {
        WALL:     "\033[34m",   # blue walls
        PATH:     "\033[0m",    # default
        START:    "\033[32m",   # green
        END:      "\033[31m",   # red
        CRUMB:    "\033[33m",   # yellow
        SOLUTION: "\033[35m",   # magenta
    }
    reset = "\033[0m"

    for row in grid:
        line = ""
        for cell in row:
            if color:
                line += colors.get(cell, "") + cell + reset
            else:
                line += cell
        print(line)


# ── Maze Solving (Iterative DFS) ───────────────────────────────────────────────

def solve_maze(grid, animate=True):
    """
    Find the path from S to E using iterative depth-first search.
    Returns the list of cells in the solution path.
    """
    rows = len(grid)
    cols = len(grid[0])

    # Find start position
    start = None
    end   = None
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == START: start = (r, c)
            if grid[r][c] == END:   end   = (r, c)

    # Stack stores (row, col, path_so_far)
    stack   = [(start[0], start[1], [start])]
    visited = set()
    visited.add(start)

    while stack:
        r, c, path = stack.pop()

        if (r, c) == end:
            return path   # found the exit!

        # Leave a breadcrumb (but don't overwrite S or E)
        if grid[r][c] not in (START, END):
            grid[r][c] = CRUMB

        if animate:
            clear()
            print_maze(grid)
            time.sleep(0.03)

        # Explore 4 neighbors
        for dr, dc in [(-1,0),(1,0),(0,-1),(0,1)]:
            nr, nc = r + dr, c + dc
            if (0 <= nr < rows and 0 <= nc < cols
                    and (nr, nc) not in visited
                    and grid[nr][nc] != WALL):
                visited.add((nr, nc))
                stack.append((nr, nc, path + [(nr, nc)]))

    return []  # no solution found


def mark_solution(grid, path):
    """Highlight the solution path with stars."""
    for r, c in path:
        if grid[r][c] not in (START, END):
            grid[r][c] = SOLUTION


# ── Main ───────────────────────────────────────────────────────────────────────

def main():
    print("🌀  MAZE GENERATOR & SOLVER")
    print("Tip: for best display, use a terminal with a small font.\n")

    try:
        rows = int(input("Maze height (# of cells, e.g. 10): ") or 10)
        cols = int(input("Maze width  (# of cells, e.g. 20): ") or 20)
    except ValueError:
        rows, cols = 10, 20

    animate_input = input("Animate the solver? (y/n, default y): ").strip().lower()
    animate = animate_input != "n"

    print("\nGenerating maze...")
    grid = generate_maze(rows, cols)

    clear()
    print("🗺️  Your maze (S = start, E = end):\n")
    print_maze(grid)

    input("\nPress Enter to solve the maze...")

    solution = solve_maze(grid, animate=animate)

    if solution:
        mark_solution(grid, solution)
        clear()
        print(f"✅  Solved! Path length: {len(solution)} steps.\n")
        print_maze(grid)
    else:
        print("❌  No solution found (this shouldn't happen with DFS!)")


if __name__ == "__main__":
    main()