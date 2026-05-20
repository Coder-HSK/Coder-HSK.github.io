"""
GAME 1: Number Guessing Game
================================
Concepts: loops, conditionals, user input, random module, functions
"""

import random

def get_difficulty():
    #Ask the player to choose a difficulty and return the max number.
    print("\n🎯 NUMBER GUESSING GAME")
    print("Choose difficulty:")
    print("  1 - Easy   (1–50,  10 guesses)")
    print("  2 - Medium (1–100, 7 guesses)")
    print("  3 - Hard   (1–200, 5 guesses)")

    choice = input("Enter 1, 2, or 3: ").strip()

    # Dictionary maps choice → (max_num, max_guesses)
    settings = {
        "1": (50, 10),
        "2": (100, 7),
        "3": (200, 5),
    }

    # .get() returns a default if the key isn't found
    return settings.get(choice, (100, 7))  # default to Medium


def play_game():
    #Run one full round of the guessing game.
    max_number, max_guesses = get_difficulty()
    secret = random.randint(1, max_number)  # pick a random secret number
    guesses_used = 0

    print(f"\nI'm thinking of a number between 1 and {max_number}.")
    print(f"You have {max_guesses} guesses. Good luck!\n")

    while guesses_used < max_guesses:
        guesses_left = max_guesses - guesses_used

        # Trying to convert input to int (handled bad input gracefully)
        try:
            guess = int(input(f"Guess ({guesses_left} left): "))
        except ValueError:
            print("  ⚠️  Please enter a whole number.")
            continue  # skiped the rest of the loop to try again

        guesses_used += 1

        if guess == secret:
            print(f"\n🎉 Correct! You got it in {guesses_used} guess(es)!")
            return True  # win!
        elif guess < secret:
            print("  📉 Too low!")
        else:
            print("  📈 Too high!")

    # Loop ended without a correct guess (HAHA LOOSER)
    print(f"\n💀 Out of guesses! The number was {secret}.")
    return False  # loss


def main():
    #Keep playing until the player quits.
    while True:
        play_game()
        again = input("\nPlay again? (y/n): ").strip().lower()
        if again != "y":
            print("Thanks for playing! 👋")
            break


if __name__ == "__main__": #The great discovery
    main()