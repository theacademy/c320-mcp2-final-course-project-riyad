-- QUERIES TEST SUPPLIER 102 LIST OF CUSTOMERS

SELECT c.*
FROM customer c
JOIN orders o ON c.customerId = o.customerId
JOIN orderproduct op ON o.orderId = op.orderId
JOIN product p ON op.productId = p.productId
JOIN productsupplier ps ON p.productId = ps.productId
WHERE ps.supplierId = 102;

-- ALTER ADDRESS customer 158
UPDATE customer
SET shippingAddress = '123 Main Street, Montreal, QC, H3A 1A1'
WHERE customerId = 158;

-- EXAMPLE QUERY BY supplier 'supplier@example.com'
SELECT c.*
FROM customer AS c
JOIN orders AS o ON o.customerId = c.customerId
JOIN orderproduct AS op ON op.orderId = o.orderId
JOIN product AS p ON p.productId = op.productId
JOIN productsupplier AS ps ON ps.productId = p.productId
JOIN supplier AS s ON s.supplierId = ps.supplierId
WHERE s.supEmail = 'supplier@example.com';

SELECT c.*
FROM customer AS c
JOIN orders AS o ON o.customerId = c.customerId
JOIN orderproduct AS op ON op.orderId = o.orderId
JOIN product AS p ON p.productId = op.productId
JOIN productsupplier AS ps ON ps.productId = p.productId
JOIN supplier AS s ON s.supplierId = ps.supplierId
WHERE s.supEmail = 'supplier2@example.com';

SELECT *
FROM orders
WHERE customerId = 120;

