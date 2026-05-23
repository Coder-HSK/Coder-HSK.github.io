"""
PROJECT 4: Blackjack
=====================
Concepts: classes, OOP, lists as stacks, special methods (__str__),
          game state management, ace handling
"""

import random


# ── Card & Deck classes ────────────────────────────────────────────────────────

class Card:
    """Represents a single playing card."""

    SUITS  = ["♠", "♥", "♦", "♣"]
    RANKS  = ["2","3","4","5","6","7","8","9","10","J","Q","K","A"]
    VALUES = {"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,
              "10":10,"J":10,"Q":10,"K":10,"A":11}

    def __init__(self, rank, suit):
        self.rank  = rank
        self.suit  = suit
        self.value = Card.VALUES[rank]

    # __str__ is called when you do print(card) or str(card)
    def __str__(self):
        return f"{self.rank}{self.suit}"


class Deck:
    """A shuffled deck of 52 cards."""

    def __init__(self):
        self.cards = [Card(rank, suit)
                      for suit in Card.SUITS
                      for rank in Card.RANKS]
        random.shuffle(self.cards)

    def deal(self):
        """Remove and return the top card (last item = fast pop)."""
        return self.cards.pop()


# ── Hand class ─────────────────────────────────────────────────────────────────

class Hand:
    """A player's or dealer's hand of cards."""

    def __init__(self):
        self.cards = []

    def add_card(self, card):
        self.cards.append(card)

    def total(self):
        """
        Calculate hand value. Aces start at 11; if total > 21,
        count each ace as 1 instead until we're safe (or bust).
        """
        total = sum(c.value for c in self.cards)
        aces  = sum(1 for c in self.cards if c.rank == "A")

        while total > 21 and aces:
            total -= 10   # flip an ace from 11 → 1
            aces  -= 1

        return total

    def is_bust(self):
        return self.total() > 21

    def is_blackjack(self):
        return len(self.cards) == 2 and self.total() == 21

    def show(self, hide_second=False):
        """Display cards. hide_second=True for dealer's face-down card."""
        if hide_second:
            return f"[{self.cards[0]}] [??]"
        return "  ".join(str(c) for c in self.cards) + f"  (total: {self.total()})"


# ── Game logic ─────────────────────────────────────────────────────────────────

def play_round(deck, bankroll):
    """Play one round of Blackjack. Returns updated bankroll."""

    # --- Bet ---
    print(f"\n💰 Bankroll: ${bankroll}")
    while True:
        try:
            bet = int(input("  Place your bet: $"))
            if 1 <= bet <= bankroll:
                break
            print(f"  ⚠️  Bet must be between $1 and ${bankroll}.")
        except ValueError:
            print("  ⚠️  Enter a whole number.")

    # --- Deal ---
    player = Hand()
    dealer = Hand()
    for _ in range(2):          # deal 2 cards each, alternating
        player.add_card(deck.deal())
        dealer.add_card(deck.deal())

    print(f"\n  Dealer: {dealer.show(hide_second=True)}")
    print(f"  You:    {player.show()}")

    # --- Check immediate blackjack ---
    if player.is_blackjack():
        print("\n  🃏 Blackjack!")
        if dealer.is_blackjack():
            print("  Dealer also has Blackjack. Push (tie).")
            return bankroll        # no change
        winnings = int(bet * 1.5)
        print(f"  You win ${winnings}!")
        return bankroll + winnings

    # --- Player's turn ---
    while True:
        action = input("\n  Hit (h) or Stand (s)? ").strip().lower()
        if action == "h":
            player.add_card(deck.deal())
            print(f"  You:    {player.show()}")
            if player.is_bust():
                print("  💥 Bust! You lose.")
                return bankroll - bet
        elif action == "s":
            break
        else:
            print("  ⚠️  Enter 'h' or 's'.")

    # --- Dealer's turn (must hit until 17+) ---
    print(f"\n  Dealer reveals: {dealer.show()}")
    while dealer.total() < 17:
        dealer.add_card(deck.deal())
        print(f"  Dealer hits:    {dealer.show()}")

    # --- Determine outcome ---
    p_total = player.total()
    d_total = dealer.total()

    if dealer.is_bust():
        print(f"\n  Dealer busts! You win ${bet}! 🎉")
        return bankroll + bet
    elif p_total > d_total:
        print(f"\n  You win ${bet}! 🎉  ({p_total} vs {d_total})")
        return bankroll + bet
    elif p_total < d_total:
        print(f"\n  Dealer wins. 😔  ({p_total} vs {d_total})")
        return bankroll - bet
    else:
        print(f"\n  Push — it's a tie. ({p_total} vs {d_total})")
        return bankroll


def main():
    print("🃏  BLACKJACK  (Beat the dealer to 21!)")
    bankroll = 100

    # Re-create the deck every 26 cards (roughly half a deck used)
    deck = Deck()

    while bankroll > 0:
        if len(deck.cards) < 15:
            print("\n  🔀 Shuffling a new deck...")
            deck = Deck()

        bankroll = play_round(deck, bankroll)

        if bankroll <= 0:
            print("\n💸 You're broke! Game over.")
            break

        again = input("\nPlay another round? (y/n): ").strip().lower()
        if again != "y":
            break

    print(f"\nYou finished with ${bankroll}. Thanks for playing!")


if __name__ == "__main__":
    main()