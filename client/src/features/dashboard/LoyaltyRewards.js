import React from 'react';
import { Card, Badge, Row, Col } from 'react-bootstrap';
import { Award, Star, Gift, Trophy } from 'react-bootstrap-icons';
import './LoyaltyRewards.css';

const rewards = [
  { id: 1, name: 'Free Drink', points: 100, icon: '🍸', claimed: false },
  { id: 2, name: 'VIP Upgrade', points: 500, icon: '⭐', claimed: false },
  { id: 3, name: 'Complimentary Bottle', points: 1000, icon: '🥂', claimed: true },
  { id: 4, name: 'Private Event Discount', points: 2000, icon: '🎉', claimed: false },
];

const LoyaltyRewards = () => {
  const points = 750;
  const nextTier = 1000;
  const pct = Math.min(Math.round((points / nextTier) * 100), 100);

  return (
    <Card className="dash-card">
      <Card.Header>
        <Award className="me-2" /> Loyalty & Rewards
      </Card.Header>
      <Card.Body>
        {/* Points Summary */}
        <div className="loyalty-header mb-4">
          <Row className="align-items-center">
            <Col>
              <h4 className="fw-bold mb-0">{points} <small className="text-muted">points</small></h4>
              <small className="text-muted">Next tier at {nextTier} points</small>
            </Col>
            <Col md="auto">
              <Badge bg="warning" className="fs-6 py-2 px-3">
                <Trophy className="me-1" /> Gold Member
              </Badge>
            </Col>
          </Row>
       <div className="loyalty-progress">
  <div className="loyalty-progress-bar" style={{ width: `${pct}%` }}></div>
</div>
<small className="text-muted mt-1 d-block">{pct}% to Platinum tier</small>
       
        </div>

        {/* Rewards Grid */}
        <Row className="g-3">
          {rewards.map(r => (
            <Col xs={6} md={3} key={r.id}>
              <div className={`reward-card ${r.claimed ? 'reward-claimed' : ''}`}>
                <span className="reward-icon">{r.icon}</span>
                <strong className="reward-name">{r.name}</strong>
                <small className="text-muted">{r.points} pts</small>
                <Badge bg={r.claimed ? 'secondary' : 'primary'} className="mt-2">
                  {r.claimed ? 'Claimed' : 'Available'}
                </Badge>
              </div>
            </Col>
          ))}
        </Row>
      </Card.Body>
    </Card>
  );
};

export default LoyaltyRewards;   