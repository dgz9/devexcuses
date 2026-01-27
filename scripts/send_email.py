#!/usr/bin/env python3
"""Send email via Gmail SMTP. Usage: send_email.py <to> <subject> <body> [--html]"""
import sys
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

GMAIL_USER = "dgonzalez1992@gmail.com"
GMAIL_APP_PASSWORD = "odzp ubep kwxw qhkq"

def send_email(to: str, subject: str, body: str, html: bool = False):
    msg = MIMEMultipart("alternative")
    msg["Subject"] = subject
    msg["From"] = f"Luke 🛠️ <{GMAIL_USER}>"
    msg["To"] = to
    
    if html:
        # Add plain text fallback
        plain_text = body.replace('<br>', '\n').replace('</p>', '\n').replace('</li>', '\n')
        import re
        plain_text = re.sub('<[^<]+?>', '', plain_text)
        msg.attach(MIMEText(plain_text, "plain"))
        msg.attach(MIMEText(body, "html"))
    else:
        msg.attach(MIMEText(body, "plain"))
    
    with smtplib.SMTP("smtp.gmail.com", 587) as server:
        server.starttls()
        server.login(GMAIL_USER, GMAIL_APP_PASSWORD)
        server.send_message(msg)
    
    print(f"Email sent to {to}")

def create_daily_summary_html(date: str, sections: list) -> str:
    """Create a beautifully styled HTML email for daily summaries.
    
    sections: list of dicts with 'icon', 'title', 'items' (list of strings)
    """
    
    sections_html = ""
    for section in sections:
        items_html = "".join([f'<li style="margin-bottom: 8px; color: #374151;">{item}</li>' for item in section.get('items', [])])
        sections_html += f'''
        <div style="margin-bottom: 24px;">
            <h2 style="font-size: 18px; color: #1f2937; margin: 0 0 12px 0; display: flex; align-items: center;">
                <span style="margin-right: 8px;">{section.get('icon', '📌')}</span>
                {section.get('title', 'Section')}
            </h2>
            <ul style="margin: 0; padding-left: 24px; list-style-type: disc;">
                {items_html}
            </ul>
        </div>
        '''
    
    html = f'''
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #f3f4f6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #1e293b 0%, #334155 100%); border-radius: 12px 12px 0 0; padding: 32px; text-align: center;">
            <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">
                📋 Daily Summary
            </h1>
            <p style="margin: 8px 0 0 0; color: #94a3b8; font-size: 14px;">
                {date}
            </p>
        </div>
        
        <!-- Content -->
        <div style="background-color: #ffffff; padding: 32px; border-left: 1px solid #e5e7eb; border-right: 1px solid #e5e7eb;">
            {sections_html}
        </div>
        
        <!-- Footer -->
        <div style="background-color: #f8fafc; border-radius: 0 0 12px 12px; padding: 20px; text-align: center; border: 1px solid #e5e7eb; border-top: none;">
            <p style="margin: 0; color: #64748b; font-size: 12px;">
                Sent by <strong>Luke</strong> 🛠️ • Your AI Developer
            </p>
            <p style="margin: 8px 0 0 0; color: #94a3b8; font-size: 11px;">
                Powered by Clawdbot
            </p>
        </div>
    </div>
</body>
</html>
'''
    return html

if __name__ == "__main__":
    if len(sys.argv) < 4:
        print("Usage: send_email.py <to> <subject> <body> [--html]")
        sys.exit(1)
    
    is_html = "--html" in sys.argv
    args = [a for a in sys.argv[1:] if a != "--html"]
    send_email(args[0], args[1], args[2], html=is_html)
