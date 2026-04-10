-- Monteerly OS Sovereign Database Schema
CREATE TABLE fraud_detection ( id UUID PRIMARY KEY, user_id UUID, fraud_score INT, action_taken TEXT );
CREATE TABLE escrow_movements ( id UUID PRIMARY KEY, project_id UUID, amount DECIMAL, status TEXT );
CREATE TABLE transactions ( id UUID PRIMARY KEY, session_id TEXT, amount DECIMAL, fee DECIMAL );
CREATE TABLE security_logs ( id UUID PRIMARY KEY, event_type TEXT, ip_address TEXT, risk_level INT );
