-- Insert sample restaurants
INSERT INTO
    restaurants (id, name)
VALUES
    (
        '550e8400-e29b-41d4-a716-446655440000',
        'Barbeque of Bob'
    ),
    (
        '550e8400-e29b-41d4-a716-446655440001',
        'Golden Sushi Palace'
    ),
    (
        '550e8400-e29b-41d4-a716-446655440002',
        'Taste of The Mediterranean'
    );

-- Insert sample customers
INSERT INTO
    customers (id, name)
VALUES
    (
        '123e4567-e89b-12d3-a456-426614174000',
        'Charlize Theron'
    ),
    (
        '123e4567-e89b-12d3-a456-426614174001',
        'Fred Flintstone'
    ),
    (
        '123e4567-e89b-12d3-a456-426614174002',
        'Charlie Brown'
    );

-- Insert sample reservations
INSERT INTO
    reservations (
        id,
        customer_id,
        restaurant_id,
        party_count,
        reservation_date
    )
VALUES
    (
        '789e4567-e89b-12d3-a456-426614174000',
        '123e4567-e89b-12d3-a456-426614174000',
        '550e8400-e29b-41d4-a716-446655440000',
        2,
        '2025-02-15'
    ),
    (
        '789e4567-e89b-12d3-a456-426614174001',
        '123e4567-e89b-12d3-a456-426614174001',
        '550e8400-e29b-41d4-a716-446655440001',
        4,
        '2025-02-16'
    ),
    (
        '789e4567-e89b-12d3-a456-426614174002',
        '123e4567-e89b-12d3-a456-426614174002',
        '550e8400-e29b-41d4-a716-446655440002',
        3,
        '2025-02-17'
    );