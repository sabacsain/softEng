from tkinter import *
from tkinter import messagebox, ttk
import sqlite3 as sql
import dashboard, today_waste, inventory, price

import os
import pandas as pd
from datetime import date

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
def showTodayWasteRecord(window, waste_entry,weight_entry, pcs_entry, cbx_type):

    #SQL connection
    conn = sql.connect(path())
    c = conn.cursor()

    #Creates table for today's waste page
    create_waste_table = """CREATE TABLE IF NOT EXISTS waste_tbl
        (ID INTEGER PRIMARY KEY AUTOINCREMENT,
        WASTE TEXT NOT NULL,
        TYPE TEXT NOT NULL, 
        KGS FLOAT,
        PCS INTEGER,
        PRICE FLOAT ,
        DATE DEFAULT (date('now')))    
    """
    c.execute(create_waste_table)
    # conn.commit()

    #get values from table and display it to the treeview di pa tapos
    records = pd.read_sql_query("SELECT * FROM waste_tbl WHERE DATE=?",conn, params=[date.today()])
    
    #Displays table if today_waste_tbl exist
    # Creates the treeview widget
    global today_waste_tbl

    today_waste_tbl = ttk.Treeview(window, columns=('ID','WASTE','TYPE','KGS','PCS','PRICE'), show='headings',height=10)
    today_waste_tbl.heading('ID', text = "#")
    today_waste_tbl.heading('WASTE', text = "WASTE")
    today_waste_tbl.heading('TYPE', text = "TYPE")
    today_waste_tbl.heading('KGS', text = "KGS")
    today_waste_tbl.heading('PCS', text = "PCS")
    today_waste_tbl.heading('PRICE', text = "PRICE")
    

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


    # Populate the treeview with data from the dataframe
    for index, row in records.iterrows():
        today_waste_tbl.insert(parent='',index='end', values=list(row))     

    # Shows the table
    today_waste_tbl.place(anchor='center', relx=.6309, rely=.403)

    #Closes connections
    conn.close()

    # When table row is clicked, display values into the entries
    today_waste_tbl.bind("<<TreeviewSelect>>", lambda event: select_waste_record(waste_entry, weight_entry, pcs_entry,cbx_type))

    clear_waste_fields (waste_entry, weight_entry, pcs_entry,cbx_type)



def clear_waste_fields(waste_entry, weight_entry, pcs_entry,cbx_type):
    waste_entry.delete(0,END)
    weight_entry.delete(0,END)
    pcs_entry.delete(0,END)
    cbx_type.set("")

    
def select_waste_record(waste_entry, weight_entry, pcs_entry,cbx_type):
    
    selected_item = today_waste_tbl.focus()
    details = today_waste_tbl.item(selected_item).get("values")

    global waste_ID
    waste_ID = details[0]
    waste = details[1]
    typeOfWaste = details[2]
    weight = details[3]
    pcs = details [4]
    price = details[5]
    
    #put values on each entry and cbx
    waste_entry.delete(0,END)
    waste_entry.insert(0,waste)
    weight_entry.delete(0,END)
    weight_entry.insert(0,weight)
    pcs_entry.delete(0,END)
    pcs_entry.insert(0,pcs)
    cbx_type.set(typeOfWaste)



# adding today's waste
def insert_waste_record (wasteName_entry,weight_entry,pcs_entry,typeOfWaste_cbx, window):
    wasteName = wasteName_entry.get()
    weight = weight_entry.get()
    pcs = pcs_entry.get()
    typeOfWaste = typeOfWaste_cbx.get()

    #check if there are null entries  and cbx
    if (not wasteName or (not weight and not pcs) or not typeOfWaste):
        messagebox.showerror("Error","Please Satsify all the Fields")

    #checks if weight AND pcs entries have values
    elif(weight and pcs):
        messagebox.showerror("Error", "Weight and Pieces cannot have values at the same time")

    #insert record to waste_tbl
    else:
        try:
            if (pcs): pcs = int(pcs)
            if (weight): weight = float(weight)

        except ValueError:
            messagebox.showerror("Error","Incorrect data type for weight/pcs")
            return

        price = 1000 #temporary
        waste = wasteName.upper()

        try:
            #SQL connection
            conn = sql.connect(path())
            c = conn.cursor()

            
            c.execute("INSERT INTO waste_tbl (WASTE, TYPE, KGS, PCS, PRICE) VALUES (?,?,?,?,?)", (wasteName,typeOfWaste, weight, pcs, price))

            conn.commit()
            conn.close()
        
        except sql.Error as e:
            messagebox.showerror("Error",f"Error occured: {e}")
        

        showTodayWasteRecord(window, wasteName_entry, weight_entry, pcs_entry, typeOfWaste_cbx)

        
def update_waste_record(wasteName_entry,weight_entry,pcs_entry,typeOfWaste_cbx, window):
    wasteName = wasteName_entry.get()
    weight = weight_entry.get()
    pcs = pcs_entry.get()
    typeOfWaste = typeOfWaste_cbx.get()

    #check if there are null entries  and cbx
    if (not wasteName or (not weight and not pcs) or not typeOfWaste):
        messagebox.showerror("Error","Please Satsify all the Fields")

    #checks if weight AND pcs entries have values
    elif(weight and pcs):
        messagebox.showerror("Error", "Weight and Pieces cannot have values at the same time")

    #insert record to waste_tbl
    else:
        try:
            if (pcs): pcs = int(pcs)
            if (weight): weight = float(weight)

        except ValueError:
            messagebox.showerror("Error","Incorrect data type for weight/pcs")
            return

        price = 1000 #temporary
        waste = wasteName.upper()

        try:
            #SQL connection
            conn = sql.connect(path())
            c = conn.cursor()

            
            c.execute("UPDATE waste_tbl SET WASTE=?, TYPE=?, KGS=?, PCS=?, PRICE=? WHERE ID=? ", [wasteName,typeOfWaste, weight, pcs, price,waste_ID])

            conn.commit()
            conn.close()
        
        except sql.Error as e:
            messagebox.showerror("Error",f"Error occured: {e}")
        

        showTodayWasteRecord(window, wasteName_entry, weight_entry, pcs_entry, typeOfWaste_cbx)

    


#---------------END OF TODAY'S WASTE------------------------------
