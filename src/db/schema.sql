-- 1. جدول كشف الاحتيال (الجديد)
CREATE TABLE fraud_detection (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    fraud_score INT DEFAULT 0, -- 0 = نظيف، 50+ = حظر
    last_incident_date TIMESTAMP NULL,
    incident_type ENUM('dispute', 'chargeback', 'suspicious_pattern'),
    blocked BOOLEAN DEFAULT FALSE,
    block_reason TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_score (fraud_score),
    INDEX idx_blocked (blocked)
);

-- 2. جدول سجلات الويب هوك (للتدقيق الجنائي)
CREATE TABLE stripe_webhooks (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    event_id VARCHAR(255) UNIQUE, -- لمنع التكرار (Idempotency)
    event_type VARCHAR(100),
    webhook_json JSON,
    transaction_id BIGINT,
    processed BOOLEAN DEFAULT FALSE,
    processed_at TIMESTAMP NULL,
    error_message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (transaction_id) REFERENCES transactions(id) ON DELETE SET NULL,
    INDEX idx_event_id (event_id),
    INDEX idx_processed (processed)
);

-- 3. تحديث جدول المعاملات لدعم Stripe والنزاعات
ALTER TABLE transactions 
ADD COLUMN stripe_session_id VARCHAR(255),
ADD COLUMN stripe_payment_intent_id VARCHAR(255),
ADD COLUMN webhook_received_at TIMESTAMP NULL,
ADD COLUMN webhook_event_id VARCHAR(255);

-- 4. جدول حركات الضمان (للتتبع الدقيق)
CREATE TABLE escrow_movements (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    escrow_account_id BIGINT,
    movement_type ENUM('funded', 'released', 'refunded'),
    amount DECIMAL(10, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
