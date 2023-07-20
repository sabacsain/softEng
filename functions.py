from tkinter import *
from tkinter import messagebox, ttk
import sqlite3
import dashboard, today_waste, inventory, price

# Calling all the GUI files
def callDashboard(window, frame):
    dashboard.start(window, frame)

def callTodayWaste(window, frame):
    today_waste.start(window, frame)

def callInventory(window, frame):
    inventory.start(window, frame)

def callPriceConv(window, frame):
    price.start(window, frame)



