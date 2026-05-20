"""
PROJECT 6: Trivia Quiz Game
============================
Concepts: JSON file I/O, dictionaries, random.sample, enumerate,
          score tracking, timer (optional), modular design

Requires: 06_questions.json in the same folder as this script.
"""

import json
import random
import time
import os


# ── Load questions from JSON ───────────────────────────────────────────────────

def load_questions(filepath):
    """
    Open a JSON file and parse it into a Python dictionary.
    The JSON structure is: { "Category": [ {question objects}, ... ], ... }
    """
    # Resolve the path relative to this script's location
    base_dir = os.path.dirname(os.path.abspath(__file__))
    full_path = os.path.join(base_dir, filepath)

    with open(full_path, "r") as f:   # 'with' ensures the file is closed
        return json.load(f)           # parse JSON → Python dict


# ── Quiz Logic ────────────────────────────────────────────────────────────────

def pick_questions(all_questions, num_questions, category=None):
    """
    Select questions:
    - If category is given, pull from that category only.
    - Otherwise mix across all categories.
    Returns a flat list of question dicts.
    """
    if category and category in all_questions:
        pool = all_questions[category]
    else:
        # Flatten all categories into one list
        pool = [q for questions in all_questions.values() for q in questions]

    # random.sample picks N items without replacement
    return random.sample(pool, min(num_questions, len(pool)))


def ask_question(number, question_data, timed=False):
    """
    Display one question with shuffled choices and return True if correct.
    """
    print(f"\n  Q{number}: {question_data['question']}")

    # Shuffle the answer choices so the correct one isn't always in the same spot
    choices = question_data["choices"][:]   # copy the list
    random.shuffle(choices)

    for i, choice in enumerate(choices, start=1):  # enumerate adds an index
        print(f"    {i}. {choice}")

    start = time.time()

    # Keep asking until a valid number is entered
    while True:
        try:
            answer_num = int(input("  Your answer (number): ").strip())
            if 1 <= answer_num <= len(choices):
                break
            print(f"  ⚠️  Enter a number between 1 and {len(choices)}.")
        except ValueError:
            print("  ⚠️  Please enter a number.")

    elapsed = time.time() - start
    chosen  = choices[answer_num - 1]
    correct = question_data["answer"]

    if chosen == correct:
        if timed:
            print(f"  ✅ Correct!  ({elapsed:.1f}s)")
        else:
            print("  ✅ Correct!")
        return True
    else:
        print(f"  ❌ Wrong! The answer was: {correct}")
        return False


def show_scoreboard(score, total, category, timed):
    """Print the final results with a star rating."""
    pct = score / total * 100
    print("\n" + "=" * 40)
    print(f"  📊 QUIZ COMPLETE — {category}")
    print(f"  Score: {score}/{total}  ({pct:.0f}%)")

    if pct == 100:
        rating = "⭐⭐⭐ Perfect!"
    elif pct >= 70:
        rating = "⭐⭐  Well done!"
    elif pct >= 40:
        rating = "⭐   Keep practicing."
    else:
        rating = "    Better luck next time!"

    print(f"  {rating}")
    print("=" * 40)


# ── Main ──────────────────────────────────────────────────────────────────────

def main():
    print("🧠  TRIVIA QUIZ GAME")

    all_questions = load_questions("06_questions.json")
    categories    = list(all_questions.keys())

    # Choose category
    print("\nAvailable categories:")
    print("  0. All categories (mixed)")
    for i, cat in enumerate(categories, start=1):
        print(f"  {i}. {cat}")

    try:
        cat_choice = int(input("Choose a category: ").strip())
        if cat_choice == 0:
            category = None
            cat_label = "Mixed"
        else:
            category  = categories[cat_choice - 1]
            cat_label = category
    except (ValueError, IndexError):
        category  = None
        cat_label = "Mixed"

    # Number of questions
    try:
        num = int(input("How many questions? (default 5): ").strip() or 5)
    except ValueError:
        num = 5

    # Timed mode?
    timed = input("Enable timer? (y/n, default n): ").strip().lower() == "y"

    questions = pick_questions(all_questions, num, category)
    score     = 0

    print(f"\n🎮 Starting {cat_label} quiz with {len(questions)} questions!")
    print("-" * 40)

    for i, q in enumerate(questions, start=1):
        if ask_question(i, q, timed):
            score += 1

    show_scoreboard(score, len(questions), cat_label, timed)

    again = input("\nPlay again? (y/n): ").strip().lower()
    if again == "y":
        main()
    else:
        print("Thanks for playing! 🧠")


if __name__ == "__main__":
    main()