# Lichess-Keyboard-Input
Move pieces faster using your keyboard on Lichess <br />
It is a legal way to become faster in ultrabullet

You can try it here: https://ultrabullet.com/ultratraining

A video example: https://youtu.be/UAExpNbLlIo

Many thanks to Vempele, the author of the original script, from which I took ideas and parts of the code: https://gist.github.com/Vempele/46333e85e33b6d488c3ffb131942272d

The forum discussion: https://lichess.org/forum/lichess-feedback/feature-request-using-keyboard-for-selecting-pieces?page=1

# How to use
1. Install Tampermonkey: https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en ![Install Tampermonkey](https://i.snag.gy/0WiDQN.jpg)
2. Copy the script from here (Copy the RAW paste data): https://pastebin.com/yZszPURF (Scroll to the bottom of the page). Or you can go to this page: https://pastebin.com/raw/yZszPURF and press Ctrl+A (Select all), Ctrl+C (Copy). ![Copy the script](https://i.snag.gy/g2IaXi.jpg)
3. Create a new script: ![Create a new script](https://i.snag.gy/J8uvQD.jpg)
4. In Tampermonkey delete everything from the new script and paste the code there: ![Paste the script](https://i.snag.gy/3l5fso.jpg)
5. Click save: ![Save](https://i.snag.gy/4TJ6QS.jpg)
6. Create a game against Stockfish on Lichess. 
7. The default set of keys:
___________________________
w     = Moves a pawn forward. <br />
q     = Take with a pawn to the left <br />
e     = Take with a pawn to the right <br />
s     = Queen <br />
shift = King <br />
a     = The left knight (without a green square) <br />
d     = The right knight (with a green square) <br />
1     = The left rook (without a green square) <br />
3     = The right rook (with a green square) <br />
space = Bishops <br />
2     = cansel premoves <br />
4     = offer rematch <br />
(You can change keys to any other keys) <br />

8. Try this in a game. To move a piece you have to hover your mouse cursor over a square-destination and press a corresponding key (you don't have to click your mouse buttons). For example, hover your mouse cursor over e4 and press "w". 

9. To change the keys, open the script (Tampermonkey icon, Dashboard, KeyboardLichessKeys), and find this part in the beginning: 
![Keys](https://i.snag.gy/admb3S.jpg)
There you can change the keys and click "Save"

# Switching between keys
It can be difficult to switch between keys. <br />
So there are several possible solutions. <br />
a. Using a second keyboard as pedals, removing all the keys except two in the middle in this manner: ![Pedals](https://i2.wp.com/www.synthtopia.com/wp-content/uploads/2018/10/usb-foot-switch-computer-keyboard-e1539127171568.jpg)
How to build: https://www.youtube.com/watch?v=EGr3lvBtMV0 <br />

b. Heightening two keys (for example, "x" and "v" by gluing something to them) to press them with the palm. Effectively increasing the number of hand digits to 7. <br />
![Heighten keys](https://i.snag.gy/S8JfLl.jpg) <br />
![Heighten keys](https://i.snag.gy/YcQZyg.jpg) <br />

c. Mapping some keys to the mouse. ![Mouse mapping](https://i.ytimg.com/vi/duKTSAMomo4/maxresdefault.jpg)
