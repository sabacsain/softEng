
# This file was generated by the Tkinter Designer by Parth Jadhav
# https://github.com/ParthJadhav/Tkinter-Designer


from pathlib import Path

# from tkinter import *
# Explicit imports to satisfy Flake8
from tkinter import Tk, Canvas, Entry, Text, Button, PhotoImage, ttk


OUTPUT_PATH = Path(__file__).parent
ASSETS_PATH = OUTPUT_PATH / Path(r"assets/frame1")


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
    text="Today’s Waste",
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

canvas.create_rectangle(
    395.0,
    127.0,
    1222.0,
    167.0,
    fill="#000000",
    outline="")

canvas.create_text(
    415.0,
    136.0,
    anchor="nw",
    text="Food waste record for today",
    fill="#FFFFFF",
    font=("Poppins SemiBold", 14 * -1)
)

canvas.create_rectangle(
    395.0,
    398.0,
    1222.0,
    433.0,
    fill="#000000",
    outline="")

canvas.create_text(
    415.0,
    405.0,
    anchor="nw",
    text="Waste Information",
    fill="#FFFFFF",
    font=("Poppins SemiBold", 14 * -1)
)

canvas.create_text(
    395.0,
    476.0,
    anchor="nw",
    text="Waste:",
    fill="#030302",
    font=("Poppins SemiBold", 14 * -1)
)

image_image_3 = PhotoImage(
    file=relative_to_assets("image_3.png"))
image_3 = canvas.create_image(
    675.0,
    491.0,
    image=image_image_3
)

entry_image_1 = PhotoImage(
    file=relative_to_assets("entry_1.png"))
entry_bg_1 = canvas.create_image(
    675.5,
    490.5,
    image=entry_image_1
)
entry_1 = Entry(
    bd=0,
    bg="#FFFFFF",
    fg="#000716",
    highlightthickness=0
)
entry_1.place(
    x=474.0,
    y=472.0,
    width=403.0,
    height=35.0
)

canvas.create_text(
    395.0,
    554.0,
    anchor="nw",
    text="Qty (kg):",
    fill="#030302",
    font=("Poppins SemiBold", 14 * -1)
)

image_image_4 = PhotoImage(
    file=relative_to_assets("image_4.png"))
image_4 = canvas.create_image(
    549.0,
    563.0,
    image=image_image_4
)

entry_image_2 = PhotoImage(
    file=relative_to_assets("entry_2.png"))
entry_bg_2 = canvas.create_image(
    550.0,
    562.5,
    image=entry_image_2
)
entry_2 = Entry(
    bd=0,
    bg="#FFFFFF",
    fg="#000716",
    highlightthickness=0
)
entry_2.place(
    x=474.0,
    y=545.0,
    width=152.0,
    height=33.0
)

canvas.create_text(
    653.0,
    554.0,
    anchor="nw",
    text="Pieces:",
    fill="#030302",
    font=("Poppins SemiBold", 14 * -1)
)

image_image_5 = PhotoImage(
    file=relative_to_assets("image_5.png"))
image_5 = canvas.create_image(
    801.0,
    563.0,
    image=image_image_5
)

entry_image_3 = PhotoImage(
    file=relative_to_assets("entry_3.png"))
entry_bg_3 = canvas.create_image(
    800.0,
    562.5,
    image=entry_image_3
)
entry_3 = Entry(
    bd=0,
    bg="#FFFFFF",
    fg="#000716",
    highlightthickness=0
)
entry_3.place(
    x=723.0,
    y=545.0,
    width=154.0,
    height=33.0
)

canvas.create_text(
    977.0,
    476.0,
    anchor="nw",
    text="Type:",
    fill="#030302",
    font=("Poppins SemiBold", 14 * -1)
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
    x=395.0,
    y=611.0,
    width=266.0,
    height=55.0
)

button_image_6 = PhotoImage(
    file=relative_to_assets("button_6.png"))
button_6 = Button(
    image=button_image_6,
    borderwidth=0,
    highlightthickness=0,
    command=lambda: print("button_6 clicked"),
    relief="flat"
)
button_6.place(
    x=675.0,
    y=611.0,
    width=267.0,
    height=55.0
)

button_image_7 = PhotoImage(
    file=relative_to_assets("button_7.png"))
button_7 = Button(
    image=button_image_7,
    borderwidth=0,
    highlightthickness=0,
    command=lambda: print("button_7 clicked"),
    relief="flat"
)
button_7.place(
    x=956.0,
    y=611.0,
    width=266.0,
    height=55.0
)


#########################################################################
# CUSTOM CODE

#function to get value of combo box
def cbx_type_click(event):
    global type
    type = cbx_type.get()
    print(type)

# DROPDOWN MENU
cbx_type_options = ["Canned Goods", "Fruit", "Meat", "Vegetable"]       # change me
cbx_type  = ttk.Combobox(values=cbx_type_options)
cbx_type.bind("<<ComboboxSelected>>", cbx_type_click)
cbx_type.place(
x=1035.0,
y=460.0,
width=184,
height=56,
)
cbx_type.config(
font=("Inter ExtraLight", 20 * -1),
justify="center",
state="readonly"
)





window.resizable(False, False)
window.mainloop()
