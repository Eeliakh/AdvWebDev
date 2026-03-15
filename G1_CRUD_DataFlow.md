# 1️⃣ CREATE – RResource (Sequence Diagram)

```mermaid
sequenceDiagram
    participant U as User (Browser)
    participant F as Frontend (form.js and resources.js)
    participant B as Backend (Express Route)
    participant V as express-validator
    participant S as Resource Service
    participant DB as PostgreSQL

    U->>F: Submit form
    F->>F: Client-side validation
    F->>B: POST /api/resources (JSON)

    B->>V: Validate request
    V-->>B: Validation result

    alt Validation fails
        B-->>F: 400 Bad Request + errors[]
        F-->>U: Show validation message
    else Validation OK
        B->>S: create Resource(data)
        S->>DB: INSERT INTO resources
        DB-->>S: Result / Duplicate error

        alt Duplicate
            S-->>B: Duplicate detected
            B-->>F: 409 Conflict
            F-->>U: Show duplicate message
        else Success
            S-->>B: Created resource
            B-->>F: 201 Created
            F-->>U: Show success message
        end
    end
```

# 2️⃣ READ — Resource (Sequence Diagram)

```mermaid
sequenceDiagram
    participant U as User (Browser)
    participant F as Frontend (resources.js)
    participant B as Backend (Express Route)
    participant S as Resource Service
    participant DB as PostgreSQL

    U->>F: Open resource page / refresh list
    F->>B: GET /api/resources

    B->>S: getResources()
    S->>DB: SELECT * FROM resources
    DB-->>S: Result rows

    S-->>B: Resource list
    B-->>F: 200 OK + JSON data
    F-->>U: Display resources
```

# 3️⃣ UPDATE — Resource (Sequence Diagram)

```mermaid
sequenceDiagram
    participant U as User (Browser)
    participant F as Frontend (form.js and resources.js)
    participant B as Backend (Express Route)
    participant V as express-validator
    participant S as Resource Service
    participant DB as PostgreSQL

    U->>F: Edit resource form
    F->>F: Client-side validation
    F->>B: PUT /api/resources/:id (JSON)

    B->>V: Validate request
    V-->>B: Validation result

    alt Validation fails
        B-->>F: 400 Bad Request + errors[]
        F-->>U: Show validation message
    else Validation OK
        B->>S: updateResource(id, data)
        S->>DB: UPDATE resources SET ...
        DB-->>S: Update result

        alt Resource not found
            S-->>B: No rows updated
            B-->>F: 404 Not Found
            F-->>U: Show error message
        else Success
            S-->>B: Updated resource
            B-->>F: 200 OK
            F-->>U: Show success message
        end
    end
```

# 4️⃣ DELETE — Resource (Sequence Diagram)

```mermaid
sequenceDiagram
    participant U as User (Browser)
    participant F as Frontend (resources.js)
    participant B as Backend (Express Route)
    participant S as Resource Service
    participant DB as PostgreSQL

    U->>F: Click delete button
    F->>B: DELETE /api/resources/:id

    B->>S: deleteResource(id)
    S->>DB: DELETE FROM resources WHERE id
    DB-->>S: Delete result

    alt Resource not found
        S-->>B: No rows deleted
        B-->>F: 404 Not Found
        F-->>U: Show error message
    else Success
        S-->>B: Resource deleted
        B-->>F: 204 No Content
        F-->>U: Remove item from UI
    end
```