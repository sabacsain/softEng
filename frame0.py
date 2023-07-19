
# This file was generated by the Tkinter Designer by Parth Jadhav
# https://github.com/ParthJadhav/Tkinter-Designer


from pathlib import Path

# from tkinter import *
# Explicit imports to satisfy Flake8
from tkinter import Tk, Canvas, Entry, Text, Button, PhotoImage, ttk


OUTPUT_PATH = Path(__file__).parent
ASSETS_PATH = OUTPUT_PATH / Path(r"assets/frame0")


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
canvas.create_rectangle(
    994.0,
    178.0,
    1222.0,
    322.0,
    fill="#17232D",
    outline="")

canvas.create_rectangle(
    395.0,
    179.0,
    662.0,
    322.0,
    fill="#16232C",
    outline="")

canvas.create_rectangle(
    665.0,
    179.0,
    991.0,
    322.0,
    fill="#17232D",
    outline="")

canvas.create_text(
    440.0,
    264.0,
    anchor="nw",
    text="Meat",
    fill="#8AC926",
    font=("Poppins Black", 35 * -1)
)

canvas.create_text(
    700.0,
    264.0,
    anchor="nw",
    text="PHP 12342",
    fill="#8AC926",
    font=("Poppins Black", 40 * -1)
)

canvas.create_text(
    1012.0,
    264.0,
    anchor="nw",
    text="4",
    fill="#A2EA2E",
    font=("Poppins Black", 40 * -1)
)

canvas.create_rectangle(
    0.0,
    1.0,
    336.0,
    702.0,
    fill="#000000",
    outline="")

image_image_1 = PhotoImage(
    file=relative_to_assets("image_1.png"))
image_1 = canvas.create_image(
    157.0,
    115.0,
    image=image_image_1
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

image_image_2 = PhotoImage(
    file=relative_to_assets("image_2.png"))
image_2 = canvas.create_image(
    808.0,
    22.0,
    image=image_image_2
)

canvas.create_rectangle(
    395.0,
    127.0,
    1222.0,
    173.0,
    fill="#000000",
    outline="")

canvas.create_text(
    408.0,
    139.0,
    anchor="nw",
    text="Current Day Waste Report",
    fill="#FFFFFF",
    font=("Poppins SemiBold", 14 * -1)
)

canvas.create_text(
    441.0,
    200.0,
    anchor="nw",
    text="Most Wasted Food Item By Price",
    fill="#FFFFFF",
    font=("Poppins Bold", 20 * -1)
)

canvas.create_text(
    700.0,
    200.0,
    anchor="nw",
    text="Accumulated Price of All Food Wastes",
    fill="#FFFFFF",
    font=("Poppins Bold", 20 * -1)
)

canvas.create_text(
    441.0,
    290.0,
    anchor="nw",
    text="PHP 2000",
    fill="#8AC926",
    font=("Poppins Bold", 20 * -1)
)

canvas.create_text(
    441.0,
    290.0,
    anchor="nw",
    text="PHP 2000",
    fill="#8AC926",
    font=("Poppins Bold", 20 * -1)
)

canvas.create_rectangle(
    393.0,
    401.0,
    1220.0,
    447.0,
    fill="#000000",
    outline="")

canvas.create_text(
    406.0,
    413.0,
    anchor="nw",
    text="Periodic Waste Report",
    fill="#FFFFFF",
    font=("Poppins SemiBold", 14 * -1)
)


canvas.create_text(
    393.0,
    64.0,
    anchor="nw",
    text="Waste Report",
    fill="#8AC926",
    font=("Poppins Bold", 25 * -1)
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
    x=1044.0,
    y=612.0,
    width=173.0,
    height=32.0
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
    x=1040.0,
    y=335.0,
    width=180.0,
    height=32.0
)

canvas.create_rectangle(
    393.0,
    110.0,
    1222.0,
    112.0,
    fill="#030302",
    outline="")

canvas.create_rectangle(
    391.0,
    378.0,
    1220.0,
    380.0,
    fill="#030302",
    outline="")

canvas.create_rectangle(
    391.0,
    663.0,
    1220.0,
    665.0,
    fill="#030302",
    outline="")

canvas.create_text(
    1009.0,
    197.0,
    anchor="nw",
    text="Total Kilograms of Food Wastes",
    fill="#FFFFFF",
    font=("Poppins Bold", 20 * -1)
)

canvas.create_rectangle(
    989.0,
    455.0,
    1217.0,
    599.0,
    fill="#A2EA2E",
    outline="")

canvas.create_rectangle(
    390.0,
    456.0,
    657.0,
    599.0,
    fill="#A2EA2E",
    outline="")

canvas.create_rectangle(
    660.0,
    456.0,
    986.0,
    599.0,
    fill="#A2EA2E",
    outline="")

canvas.create_text(
    435.0,
    541.0,
    anchor="nw",
    text="Meat",
    fill="#2D2F36",
    font=("Poppins Black", 35 * -1)
)

canvas.create_text(
    695.0,
    556.0,
    anchor="nw",
    text="PHP 12342",
    fill="#263B4A",
    font=("Poppins Black", 40 * -1)
)

canvas.create_text(
    1007.0,
    552.0,
    anchor="nw",
    text="4",
    fill="#33363F",
    font=("Poppins Black", 40 * -1)
)

canvas.create_text(
    436.0,
    477.0,
    anchor="nw",
    text="Most Wasted Food Item By Price",
    fill="#12191D",
    font=("Poppins Bold", 20 * -1)
)

canvas.create_text(
    1004.0,
    474.0,
    anchor="nw",
    text="Total Kilograms of Food Wastes",
    fill="#212C35",
    font=("Poppins Bold", 20 * -1)
)

canvas.create_text(
    436.0,
    564.0,
    anchor="nw",
    text="PHP 2000",
    fill="#33363F",
    font=("Poppins Bold", 20 * -1)
)

canvas.create_text(
    695.0,
    477.0,
    anchor="nw",
    text="Accumulated Price of All Food Wastes",
    fill="#220000",
    font=("Poppins Bold", 20 * -1)
)


#########################################################################
# CUSTOM CODE

# DROPDOWN MENU
#function to get value of combo box
def cbx_month_click(event):
    global type
    month = cbx_month.get()
    print(month)

def cbx_year_click(event):
    global type
    year = cbx_year.get()
    print(year)

# MONTH 
cbx_month_options = ["January", "February", "Meat", "Vegetable"]       # change me
cbx_month  = ttk.Combobox(values=cbx_month_options)
cbx_month.bind("<<ComboboxSelected>>", cbx_month_click)
cbx_month.place(
x=970.0,
y=408.0,
width=100,
height=30,
)
cbx_month.config(
font=("Inter ExtraLight", 20 * -1),
justify="center",
state="readonly"
)

# YEAR
cbx_year_options = ["2021", "2022", "2023"]       # change me
cbx_year  = ttk.Combobox(values=cbx_year_options)
cbx_year.bind("<<ComboboxSelected>>", cbx_month_click)
cbx_year.place(
x=1100.0,
y=408.0,
width=100,
height=30,
)
cbx_year.config(
font=("Inter ExtraLight", 20 * -1),
justify="center",
state="readonly"
)



window.resizable(False, False)
window.mainloop()
