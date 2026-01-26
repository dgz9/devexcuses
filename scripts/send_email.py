#!/usr/bin/env python3
"""Send email via Gmail SMTP. Usage: send_email.py <to> <subject> <body>"""
import sys
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

GMAIL_USER = "dgonzalez1992@gmail.com"
GMAIL_APP_PASSWORD = "odzp ubep kwxw qhkq"

def send_email(to: str, subject: str, body: str, html: bool = False):
    msg = MIMEMultipart("alternative")
    msg["Subject"] = subject
    msg["From"] = f"Luke <{GMAIL_USER}>"
    msg["To"] = to
    
    if html:
        msg.attach(MIMEText(body, "html"))
    else:
        msg.attach(MIMEText(body, "plain"))
    
    with smtplib.SMTP("smtp.gmail.com", 587) as server:
        server.starttls()
        server.login(GMAIL_USER, GMAIL_APP_PASSWORD)
        server.send_message(msg)
    
    print(f"Email sent to {to}")

if __name__ == "__main__":
    if len(sys.argv) < 4:
        print("Usage: send_email.py <to> <subject> <body>")
        sys.exit(1)
    send_email(sys.argv[1], sys.argv[2], sys.argv[3])
