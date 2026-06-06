import re
import html
import unicodedata


def sanitize_html(raw_html: str) -> str:
    """Sanitize HTML content, keeping basic formatting tags."""
    allowed_tags = {
        'p', 'br', 'strong', 'em', 'u', 's', 'blockquote',
        'ul', 'ol', 'li', 'a', 'img', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'code', 'pre', 'span', 'div',
    }

    text = unicodedata.normalize('NFC', raw_html)
    text = html.unescape(text)

    tags = re.findall(r'<[^>]+>', text)
    for tag in tags:
        tag_name = re.match(r'</?(\w+)', tag)
        if tag_name and tag_name.group(1).lower() not in allowed_tags:
            text = text.replace(tag, '')

    text = re.sub(r'<a[^>]*href=["\']([^"\']*)["\'][^>]*>', '<a href="\\1">', text)
    text = re.sub(r'<img[^>]*src=["\']([^"\']*)["\'][^>]*>', '<img src="\\1">', text)

    return text.strip()
