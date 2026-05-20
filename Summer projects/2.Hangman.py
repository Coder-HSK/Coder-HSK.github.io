"""
PROJECT 2: Hangman
==================
Concepts: strings, lists, sets, functions, file-like data structures
"""

import random

#Words i can think of rn.
WORD_BANK = {
    "animals":     ["elephant", "giraffe", "penguin", "crocodile", "kangaroo"],
    "countries":   ["brazil", "iceland", "thailand", "portugal", "ethiopia"],
    "programming": ["python", "variable", "function", "loop", "dictionary"],
    "food":        ["spaghetti", "avocado", "croissant", "burrito", "dumpling"],
}

# hangman designes (index 0 = no mistakes, 6 = dead) 
HANGMAN_STAGES = [
    """
       -----
       |   |
           |
           |
           |
           |
    =========""",
    """
       -----
       |   |
       O   |
           |
           |
           |
    =========""",
    """
       -----
       |   |
       O   |
       |   |
           |
           |
    =========""",
    """
       -----
       |   |
       O   |
      /|   |
           |
           |
    =========""",
    """
       -----
       |   |
       O   |
      /|\\  |
           |
           |
    =========""",
    """
       -----
       |   |
       O   |
      /|\\  |
      /    |
           |
    =========""",
    """
       -----
       |   |
       O   |
      /|\\  |
      / \\  |
           |
    ========="""
]

MAX_WRONG = len(HANGMAN_STAGES) - 1  # only 6 wrong guesses allowed


def pick_word():
    #Randomly pick a category and word.
    category = random.choice(list(WORD_BANK.keys()))
    word = random.choice(WORD_BANK[category])
    return word, category


def display_word(word, guessed_letters):
    #Return the word with unguessed letters replaced by underscores.
    #e.g. word='python', guessed={'p','t'} → 'p _ t _ _ _'
    return " ".join(letter if letter in guessed_letters else "_" for letter in word)


def play_game():
    #Runs one full game of Hangman.
    word, category = pick_word()
    guessed_letters = set()  # sets automatically avoid duplicates this way the user wouldn't have the same word twice.
    wrong_guesses = 0

    print(f"\n🎮 HANGMAN  |  Category: {category.upper()}")#hope the emojies dont annoy me this time.
    print(f"The word has {len(word)} letters.\n")

    while wrong_guesses < MAX_WRONG:
        print(HANGMAN_STAGES[wrong_guesses])
        print(f"\n  Word:    {display_word(word, guessed_letters)}")
        print(f"  Missed:  {', '.join(sorted(guessed_letters - set(word))) or 'none'}")

        # Checks win condition (all letters guessed)
        if all(letter in guessed_letters for letter in word):
            print(f"\n🎉 You saved him! The word was '{word}'.")
            return True

        # Get a single letter from the player, this is how i handle input() gracefully. AGAIN!!
        guess = input("\n  Guess a letter: ").strip().lower()

        if len(guess) != 1 or not guess.isalpha():
            print("  ⚠️  Please enter a single letter.")
            continue

        if guess in guessed_letters:
            print(f"  ⚠️  You already guessed '{guess}'.")
            continue

        guessed_letters.add(guess)

        if guess in word:
            print(f"  ✅ '{guess}' is in the word!")
        else:
            wrong_guesses += 1
            remaining = MAX_WRONG - wrong_guesses
            print(f"  ❌ '{guess}' is not in the word. {remaining} mistake(s) left.")

    # Show final hangman and reveal the word when the player runs out of guesses.
    print(HANGMAN_STAGES[MAX_WRONG])
    print(f"\n💀 You ran out of guesses! The word was '{word}'.")
    return False


def main():
    while True:
        play_game()
        again = input("\nPlay again? (y/n): ").strip().lower()
        if again != "y":
            print("See you next time! 👋")
            break


if __name__ == "__main__": #the great discovery.
    main()

    # this is a very vagues design to hangman. i could have made it more complex but i wanted to keep it simple and fun but my goal was to learn how dictionaries worked and how i could use them to make the code more efficient and less repetitive. i also wanted to practice using sets and lists and how they can be used to store data and how they can be manipulated. overall i think this was a fun project and i learned a lot from it.