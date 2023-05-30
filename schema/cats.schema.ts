export const cats = {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "id": "/cats",
    "title": "Cats",
    "description": "An article in the blog",
    "type": "object",
    "properties": {
      "title": {
        "description": "Main title of the blog article",
        "type": "string"
      },
      "context": {
        "description": "Body text of the blog article",
        "type": "string"
      },
    },
    "required": ["title", "context"]
  }