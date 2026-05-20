"""
PROJECT 3: Rock Paper Scissors
================================
Concepts: functions, dictionaries, tuples, score tracking, enums (via constants)
"""

import random

# --- Constants ---
CHOICES = ["rock", "paper", "scissors"]

# Maps (player_choice, computer_choice) → True if player wins
WINNING_COMBOS = {
    ("rock",     "scissors"),
    ("paper",    "rock"),
    ("scissors", "paper"),
}

EMOJI = {"rock": "🪨", "paper": "📄", "scissors": "✂️"}


def get_player_choice():
    """Prompt the player until they enter a valid choice."""
    print("\nChoices: rock (r), paper (p), scissors (s), or quit (q)")
    while True:
        raw = input("Your choice: ").strip().lower()

        # Allow shorthand
        shortcuts = {"r": "rock", "p": "paper", "s": "scissors", "q": "quit"}
        choice = shortcuts.get(raw, raw)  # expand shortcut, or keep as-is

        if choice == "quit":
            return None
        if choice in CHOICES:
            return choice

        print("  ⚠️  Invalid choice. Try again.")


def determine_winner(player, computer):
    """Return 'player', 'computer', or 'tie'."""
    if player == computer:
        return "tie"
    elif (player, computer) in WINNING_COMBOS:
        return "player"
    else:
        return "computer"


def display_round(player, computer, result):
    """Print round summary."""
    p_emoji = EMOJI[player]
    c_emoji = EMOJI[computer]
    print(f"\n  You:      {p_emoji} {player.capitalize()}")
    print(f"  Computer: {c_emoji} {computer.capitalize()}")

    if result == "tie":
        print("  🤝 It's a tie!")
    elif result == "player":
        print("  🎉 You win this round!")
    else:
        print("  😈 Computer wins this round!")


def main():
    print("🪨📄✂️  ROCK PAPER SCISSORS")
    print("First to 3 wins takes the match!\n")

    scores = {"player": 0, "computer": 0, "tie": 0}
    target = 3  # first to this score wins the match

    while scores["player"] < target and scores["computer"] < target:
        player_choice = get_player_choice()
        if player_choice is None:  # player typed 'quit'
            print("Quitting early. Thanks for playing!")
            break

        computer_choice = random.choice(CHOICES)
        result = determine_winner(player_choice, computer_choice)

        scores[result] += 1  # update the appropriate score
        display_round(player_choice, computer_choice, result)

        print(f"\n  Score → You: {scores['player']}  Computer: {scores['computer']}  Ties: {scores['tie']}")

    else:
        # This 'else' runs only when the while condition became False (no break)
        if scores["player"] == target:
            print("\n🏆 You win the match! Congratulations!")
        else:
            print("\n🤖 The computer wins the match. Better luck next time!")


if __name__ == "__main__":
    main()