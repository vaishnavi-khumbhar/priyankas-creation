PRIYANKA'S CREATION — product images
====================================

INSTALL
-------
1. Open   src/assets/products
2. DELETE everything inside it
3. Copy everything from this "products" folder into it
4. Replace  src/data/products.js  with the products.js supplied
5. Terminal:  Ctrl + C   then   npm run dev

WHAT WAS FIXED IN THIS BATCH
-----------------------------
* Removed "Focus Theme 2" listing (board-focus-boy-2.jpg) — it was
  byte-identical to "Focus Theme" (board-focus-boy.jpg), a duplicate
  photo used for two listings.
* Merged "Aaradhya – Marathi" and "Aaradhya – Temple" into a single
  listing ("Aaradhya") — both photos were of the same physical board
  and had an identical dimension sheet.
* kids-photo-frame1.jpg is still in the folder, unused by any product
  (left as-is per your instruction — decide later: add as a product
  or delete it).

NAMING RULE
-----------
    product photo    ->  <name>.jpg
    dimension sheet  ->  <name>-dim.jpg

Same <name> for both. A product can then never show another
customer's dimension sheet.

STILL WITHOUT A DIMENSION SHEET
--------------------------------
board-rudra, board-best-in-world, board-aarav-cartoon,
board-ayra-princess, board-birthday-boy, board-marathi-girl,
kids-photo-frame3, writing-board-marathi (writing-board2.jpg)

Their "Dimensions & Details" card is hidden — nothing wrong is shown.
Save each sheet as <that file name>-dim.jpg (exact same name as the
board photo) and send it over — it will be wired into products.js
right away.

STILL TO DECIDE
----------------
1. kids-photo-frame1.jpg — add it as a product or delete the file.
2. Round frame price in products.js is a placeholder (Rs 1499 / 1799)
   — set the real price.
