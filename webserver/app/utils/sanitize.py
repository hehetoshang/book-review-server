import re
import html
import unicodedata

def sanitize_html(raw_html: str) -> str:
    """Sanitize HTML content, keeping basic formatting tags and stripping dangerous attributes."""
    allowed_tags = {
        'p', 'br', 'strong', 'em', 'u', 's', 'blockquote',
        'ul', 'ol', 'li', 'a', 'img', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'code', 'pre', 'span', 'div',
    }

    text = unicodedata.normalize('NFC', raw_html)
    text = html.unescape(text)

    # 1. Remove script tags and their content
    text = re.sub(r'<script\b[^<]*(?:(?!</script>)<[^<]*)*</script>', '', text, flags=re.IGNORECASE)

    # 2. Filter allowed tags and clean their attributes
    def clean_tag(match):
        is_closing = match.group(1) == '/'
        tag_name = match.group(2).lower()
        if tag_name not in allowed_tags:
            return ''
        
        if is_closing:
            return f'</{tag_name}>'
        
        # Clean attributes
        attrs_str = match.group(3)
        if not attrs_str:
            return f'<{tag_name}>'

        # Only allow specific attributes for specific tags
        safe_attrs = []
        if tag_name == 'a':
            href_match = re.search(r'href=["\']([^"\']*)["\']', attrs_str, re.IGNORECASE)
            if href_match:
                href = href_match.group(1)
                if href.startswith(('http://', 'https://', 'mailto:', 'tel:')):
                    safe_attrs.append(f'href="{href}"')
        elif tag_name == 'img':
            src_match = re.search(r'src=["\']([^"\']*)["\']', attrs_str, re.IGNORECASE)
            if src_match:
                src = src_match.group(1)
                if src.startswith(('http://', 'https://', 'data:image/')):
                    safe_attrs.append(f'src="{src}"')
                    
        attr_string = (' ' + ' '.join(safe_attrs)) if safe_attrs else ''
        return f'<{tag_name}{attr_string}>'

    text = re.sub(r'<(/?)(\w+)([^>]*)>', clean_tag, text)
    
    return text.strip()
