
# This file was generated by the Tkinter Designer by Parth Jadhav
# https://github.com/ParthJadhav/Tkinter-Designer


from pathlib import Path

# from tkinter import *
# Explicit imports to satisfy Flake8
from tkinter import Tk, Canvas, Entry, Text, Button, PhotoImage, ttk


OUTPUT_PATH = Path(__file__).parent
ASSETS_PATH = OUTPUT_PATH / Path(r"assets/frame3")


def relative_to_assets(path: str) -> Path:
    return ASSETS_PATH / Path(path)


window = Tk()

window.geometry("1280x700")
window.configure(bg = "#FFFFFF")


canvas = Canvas(
    window,
    bg = "#FFFFFF",
    height = 700,
    width = 1280,
    bd = 0,
    highlightthickness = 0,
    relief = "ridge"
)

canvas.place(x = 0, y = 0)
image_image_1 = PhotoImage(
    file=relative_to_assets("image_1.png"))
image_1 = canvas.create_image(
    872.0,
    23.0,
    image=image_image_1
)

canvas.create_text(
    1113.0,
    7.0,
    anchor="nw",
    text="06-08-2023",
    fill="#000000",
    font=("Poppins Regular", 18 * -1)
)

canvas.create_text(
    1050.0,
    7.0,
    anchor="nw",
    text="Date:",
    fill="#000000",
    font=("Poppins SemiBold", 18 * -1)
)

canvas.create_rectangle(
    0.0,
    1.0,
    336.0,
    702.0,
    fill="#000000",
    outline="")

image_image_2 = PhotoImage(
    file=relative_to_assets("image_2.png"))
image_2 = canvas.create_image(
    157.0,
    115.0,
    image=image_image_2
)

button_image_1 = PhotoImage(
    file=relative_to_assets("button_1.png"))
button_1 = Button(
    image=button_image_1,
    borderwidth=0,
    highlightthickness=0,
    command=lambda: print("button_1 clicked"),
    relief="flat"
)
button_1.place(
    x=0.0,
    y=230.0,
    width=336.0,
    height=60.0
)

canvas.create_text(
    493.0,
    338.0,
    anchor="nw",
    text="Kilo/s",
    fill="#000000",
    font=("Poppins SemiBold", 18 * -1)
)

canvas.create_text(
    675.0,
    230.0,
    anchor="nw",
    text="Ingredient",
    fill="#000000",
    font=("Poppins SemiBold", 18 * -1)
)

canvas.create_text(
    843.0,
    338.0,
    anchor="nw",
    text="Price",
    fill="#000000",
    font=("Poppins SemiBold", 18 * -1)
)

button_image_2 = PhotoImage(
    file=relative_to_assets("button_2.png"))
button_2 = Button(
    image=button_image_2,
    borderwidth=0,
    highlightthickness=0,
    command=lambda: print("button_2 clicked"),
    relief="flat"
)
button_2.place(
    x=0.0,
    y=290.0,
    width=336.0,
    height=60.0
)

button_image_3 = PhotoImage(
    file=relative_to_assets("button_3.png"))
button_3 = Button(
    image=button_image_3,
    borderwidth=0,
    highlightthickness=0,
    command=lambda: print("button_3 clicked"),
    relief="flat"
)
button_3.place(
    x=0.0,
    y=350.0,
    width=336.0,
    height=60.0
)

button_image_4 = PhotoImage(
    file=relative_to_assets("button_4.png"))
button_4 = Button(
    image=button_image_4,
    borderwidth=0,
    highlightthickness=0,
    command=lambda: print("button_4 clicked"),
    relief="flat"
)
button_4.place(
    x=1.0,
    y=410.0,
    width=335.0,
    height=60.0
)

canvas.create_text(
    395.0,
    64.0,
    anchor="nw",
    text="Price Conversion",
    fill="#8AC926",
    font=("Poppins Bold", 25 * -1)
)

canvas.create_rectangle(
    393.0,
    110.0,
    1222.0,
    112.0,
    fill="#030302",
    outline="")

image_image_3 = PhotoImage(
    file=relative_to_assets("image_3.png"))
image_3 = canvas.create_image(
    634.0,
    391.0,
    image=image_image_3
)

entry_image_1 = PhotoImage(
    file=relative_to_assets("entry_1.png"))
entry_bg_1 = canvas.create_image(
    634.0,
    391.0,
    image=entry_image_1
)
entry_1 = Entry(
    bd=0,
    bg="#FFFFFF",
    fg="#000716",
    highlightthickness=0
)
entry_1.place(
    x=507.0,
    y=379.0,
    width=254.0,
    height=22.0
)

image_image_4 = PhotoImage(
    file=relative_to_assets("image_4.png"))
image_4 = canvas.create_image(
    984.0,
    391.0,
    image=image_image_4
)

entry_image_2 = PhotoImage(
    file=relative_to_assets("entry_2.png"))
entry_bg_2 = canvas.create_image(
    984.0,
    391.0,
    image=entry_image_2
)
entry_2 = Entry(
    bd=0,
    bg="#FFFFFF",
    fg="#000716",
    highlightthickness=0
)
entry_2.place(
    x=857.0,
    y=379.0,
    width=254.0,
    height=22.0
)

button_image_5 = PhotoImage(
    file=relative_to_assets("button_5.png"))
button_5 = Button(
    image=button_image_5,
    borderwidth=0,
    highlightthickness=0,
    command=lambda: print("button_5 clicked"),
    relief="flat"
)
button_5.place(
    x=675.0,
    y=471.0,
    width=267.0,
    height=55.0
)

canvas.create_rectangle(
    395.0,
    126.0,
    1222.0,
    166.0,
    fill="#000000",
    outline="")

canvas.create_text(
    415.0,
    135.0,
    anchor="nw",
    text="Wasted Resources",
    fill="#FFFFFF",
    font=("Poppins SemiBold", 14 * -1)
)


#########################################################################
# CUSTOM CODE

#function to get value of combo box
def cbx_ingredient_click(event):
    global type
    type = cbx_ingredient.get()
    print(type)

# DROPDOWN MENU
cbx_ingredient_options = ["Beef", "Bread", "Chicken", "Juice", "Milk", "Pork", "Potato"]       # change me
cbx_ingredient  = ttk.Combobox(values=cbx_ingredient_options)
cbx_ingredient.bind("<<ComboboxSelected>>", cbx_ingredient_click)
cbx_ingredient.place(
x=675.0,
y=265.0,
width=265,
height=56,
)
cbx_ingredient.config(
font=("Inter ExtraLight", 20 * -1),
justify="center",
state="readonly"
)





window.resizable(False, False)
window.mainloop()
