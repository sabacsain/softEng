from tkinter import *
from tkinter import messagebox, ttk
import sqlite3 as sql
import dashboard, today_waste, inventory, price

import os
import pandas as pd

# Calling all the GUI files
def callDashboard(window, frame):
    dashboard.start(window, frame)

def callTodayWaste(window, frame):
    today_waste.start(window, frame)

def callInventory(window, frame):
    inventory.start(window, frame)

def callPriceConv(window, frame):
    price.start(window, frame)

#gets the path of the database; creates the database if not existing
def path():
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    db_path = os.path.join(BASE_DIR, "food_waste_database.db")

    return db_path
     

#-----------------TODAY'S WASTE------------------------------

# Displays table for Today's Waste Page
def showTodayWasteRecord(window):
    
    #SQL connection
    conn = sql.connect(path())
    c = conn.cursor()

    #Creates table for today's waste page
    create_waste_table = """CREATE TABLE IF NOT EXISTS waste_tbl
        (ID INTEGER PRIMARY KEY AUTOINCREMENT,
        WASTE TEXT NOT NULL,
        TYPE TEXT NOT NULL, 
        KGS FLOAT DEFAULT 0,
        PCS INTEGER DEFAULT 0,
        PRICE FLOAT NOT NULL,
        DATE DEFAULT (date('now')))    
    """
    c.execute(create_waste_table)
    # conn.commit()

    #Displays table if today_waste_tbl exist
    # Creates the treeview widget
    today_waste_tbl = ttk.Treeview(window, columns=('ID','WASTE','TYPE','KGS','PCS','PRICE'), show='headings',height=10)
    today_waste_tbl.heading('ID', text = "#")
    today_waste_tbl.heading('WASTE', text = "WASTE")
    today_waste_tbl.heading('TYPE', text = "TYPE")
    today_waste_tbl.heading('KGS', text = "KGS")
    today_waste_tbl.heading('PCS', text = "PCS")
    today_waste_tbl.heading('PRICE', text = "PRICE")
    
    # Shows the table
    today_waste_tbl.place(anchor='center', relx=.6309, rely=.403)

    # Set Initial Width of Columns
    for col in today_waste_tbl['columns']:
        if (col=="ID"):
            today_waste_tbl.column(col, width=100, anchor='center')
        elif (col=="WASTE"): 
            today_waste_tbl.column(col, width=270, anchor='center')
        elif (col=="TYPE"): 
            today_waste_tbl.column(col, width=150, anchor='center')
        elif (col=="KGS"): 
            today_waste_tbl.column(col, width=100, anchor='center')
        elif (col=="PCS"): 
            today_waste_tbl.column(col, width=100, anchor='center')
        elif (col=="PRICE"): 
            today_waste_tbl.column(col, width=102, anchor='center')

    #get values from table and display it to the treeview di pa tapos
    records = pd.read_sql_query("SELECT * FROM waste_tbl", conn)


#Closes connections
    conn.close()


# adding today's waste
def insert_waste_record ():
    print("fudge")

#---------------END OF TODAY'S WASTE------------------------------
