from flask import Blueprint, redirect, url_for, render_template, request, jsonify
import sqlite3

# Create a Blueprint object
bp = Blueprint('routes', __name__, template_folder='templates')

def get_db_connection():
    conn = sqlite3.connect('database.db')
    conn.row_factory = sqlite3.Row  # This enables column access by name: row['column_name']
    return conn

@bp.route('/')
def index():
    return render_template('home.html')

@bp.route('/checkout')
def checkout():
    return redirect(url_for('routes.bag'))

@bp.route('/bag')
def bag():
    return render_template('bag.html')

@bp.route('/submit', methods=['POST'])
def submit():
    if request.method == 'POST':
        data = request.get_json()  # Get JSON data sent from the client
        conn = get_db_connection()
        cursor = conn.cursor()
        # Ensure the table exists
        cursor.execute('''
        CREATE TABLE IF NOT EXISTS customer_info (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT NOT NULL,
            country_region TEXT NOT NULL,
            first_name TEXT NOT NULL,
            last_name TEXT NOT NULL,
            address TEXT NOT NULL,
            apt_suite TEXT,
            city TEXT NOT NULL,
            state TEXT NOT NULL,
            zip_code TEXT NOT NULL,
            phone TEXT NOT NULL,
            card_number TEXT NOT NULL,
            card_expiration TEXT NOT NULL,
            card_cvc TEXT NOT NULL,
            card_name TEXT NOT NULL
        )
        ''')
        # Insert data into the table
        cursor.execute('''
        INSERT INTO customer_info (email, country_region, first_name, last_name, address, apt_suite, city, state, zip_code, phone, card_number, card_expiration, card_cvc, card_name)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            data['email'],
            data['countryRegion'],
            data['firstName'],
            data['lastName'],
            data['address'],
            data.get('aptSuite', ''),
            data['city'],
            data['state'],
            data['zip'],
            data['phone'],
            data['cardNumber'],
            data['cardExpiration'],
            data['cardCVC'],
            data['cardName']
        ))
        conn.commit()
        conn.close()
        return jsonify({'status': 'success', 'message': 'Transaction completed successfully'})

