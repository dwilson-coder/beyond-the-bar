import React, { useState } from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { Gift, Copy, CheckLg } from 'react-bootstrap-icons';
import StatusPill from '../../components/common/StatusPill';
import './LoyaltyRewards.css';

const REFERRAL_CODE = 'HARPER25';
const referrals = 2;

// Placeholder referral tiers
const rewards = [
  { id: 1, name: '$50 off your next booking', needed: 1 },
  { id: 2, name: 'Free signature cocktail upgrade', needed: 2 },
  { id: 3, name: 'Free extra hour of service', needed: 3 },
  { id: 4, name: '15% off your next event', needed: 5 },
];

const LoyaltyRewards = () => {
  const [copied, setCopied] = useState(false);
  const nextReward = rewards.find((r) => r.needed > referrals);
  const maxNeeded = rewards[rewards.length - 1].needed;

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(REFERRAL_CODE);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <Card className="dash-card">
      <Card.Header>
        <h2 className="dash-card-title"><Gift /> Referral rewards</h2>
      </Card.Header>
      <Card.Body>
        <div className="referral-hero">
          <div>
            <span className="referral-eyebrow">Share the good times</span>
            <h3 className="referral-title">Refer a friend, earn perks on your next event.</h3>
            <p className="referral-text">
              Friends get $25 off their first booking with your code. You unlock rewards for every
              booking they make.
            </p>
          </div>
          <div className="referral-code">
            <small>Your code</small>
            <div className="referral-code-row">
              <strong>{REFERRAL_CODE}</strong>
              <Button variant="primary" size="sm" onClick={copyCode}>
                {copied ? <><CheckLg className="me-1" />Copied</> : <><Copy className="me-1" />Copy</>}
              </Button>
            </div>
          </div>
        </div>

        <div className="referral-progress">
          <div className="d-flex justify-content-between mb-2">
            <strong>{referrals} successful referrals</strong>
            {nextReward && (
              <span className="dash-card-sub">
                {nextReward.needed - referrals} more to unlock “{nextReward.name}”
              </span>
            )}
          </div>
          <span className="progress-track">
            <span style={{ width: `${(referrals / maxNeeded) * 100}%` }} />
          </span>
        </div>

        <Row xs={1} sm={2} xl={4} className="g-3">
          {rewards.map((r) => {
            const unlocked = referrals >= r.needed;
            return (
              <Col key={r.id}>
                <div className={`reward-card ${unlocked ? 'is-unlocked' : ''}`}>
                  <span className="reward-needed">{r.needed} referral{r.needed > 1 ? 's' : ''}</span>
                  <span className="reward-name">{r.name}</span>
                  <StatusPill tone={unlocked ? 'success' : 'neutral'}>{unlocked ? 'Unlocked' : 'Locked'}</StatusPill>
                </div>
              </Col>
            );
          })}
        </Row>
      </Card.Body>
    </Card>
  );
};

export default LoyaltyRewards;
