import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import KnowYourVote from "@/components/KnowYourVote";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full sticky top-0 z-50 shadow-md">
      {/* Tricolor top bar */}
      <div className="flex h-1.5">
        <div className="flex-1 bg-saffron" />
        <div className="flex-1 bg-white" />
        <div className="flex-1 bg-india-green" />
      </div>
      <div className="bg-white border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
          <div className="w-9 h-9 rounded-full border-2 border-saffron bg-orange-50 flex items-center justify-center text-lg flex-shrink-0">
            🔵
          </div>
          <div>
            <h1 className="font-playfair font-bold text-lg text-foreground leading-tight tracking-wide">India's Election Guide</h1>
            <p className="text-xs text-muted-foreground">For every first-time voter</p>
          </div>
          <button
            onClick={() => setOpen(true)}
            className="ml-auto border border-saffron text-saffron rounded-full bg-orange-50 px-3 py-1.5 text-xs font-medium hover:bg-orange-100 transition cursor-pointer"
          >
            🗳️ Know Your Vote
          </button>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-playfair">🗳️ Know Your Vote</DialogTitle>
            <DialogDescription>
              Your complete voter toolkit — find your booth, check registration, and prepare your ID.
            </DialogDescription>
          </DialogHeader>
          <KnowYourVote />
        </DialogContent>
      </Dialog>
    </header>
  );
}