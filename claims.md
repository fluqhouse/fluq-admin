# Claims Management System - Complete Flow

## Overview
The claims management system handles the entire process of winners claiming their raffle prizes, from initial verification to final handover.

---

## User Journey

### 1. Winner Wins the Raffle
- Winner receives notification email with:
  - Winning ticket number
  - Item details
  - Pickup code (6-character code)
  - Pickup date/time
  - Instructions

### 2. Winner Arrives at Pickup Location
- Winner brings:
  - Valid ID
  - Pickup code
  - Email/Phone for verification

### 3. Admin Verification (Admin Portal)
**Page:** `/logistics/verify-claim`

**Admin Actions:**
1. Select the raffle item from dropdown
2. Ask winner for their identifier (email/phone/user ID)
3. Ask winner for their pickup code
4. Submit verification form

**System Actions:**
- Validates pickup code and winner identity
- Sends approval email to winner
- Returns verification result with claim details

### 4. Winner Approves Claim (Email)
**Winner receives email with:**
- Claim details
- Approval button/link
- Link format: `https://yoursite.com/claim-approval/{approvalToken}`

**Winner clicks approval link:**
- Redirected to public approval page
- Sees success message with:
  - Item won
  - Ticket number
  - Pickup code reminder
  - Next steps
- Option to print confirmation

### 5. Admin Checks Approval Status
**Page:** `/logistics/claims/{claimId}`

**Features:**
- Auto-refreshes every 10 seconds
- Shows real-time approval status
- Displays timeline of events
- Shows winner details
- Option to resend pickup code if needed

**Status Flow:**
```
pending_verification → verified → approved → claimed
```

### 6. Final Handover (Admin Portal)
**When claim is approved:**
- Admin sees "Ready for Handover" button
- Admin clicks "Process Final Handover"
- Admin adds optional notes (e.g., "ID verified, item condition: new")
- System marks claim as completed
- Winner receives final confirmation email

---

## Admin Pages

### 1. Claims Management (`/logistics/claims`)
**Purpose:** Overview of all claims across items

**Features:**
- Select raffle item to view claims
- Filter claims by status
- View statistics (total, pending, verified, approved, claimed)
- Quick access to verify new claims
- Table showing all claims with details
- Click claim to view details

**Data Displayed:**
- Winner name, email, phone
- Ticket number
- Pickup code
- Pickup date
- Current status
- Action buttons

### 2. Verify Claim (`/logistics/verify-claim`)
**Purpose:** Verify winners when they arrive for pickup

**Process:**
1. Select raffle item
2. Enter winner identifier
3. Enter pickup code
4. Submit for verification

**Success Result:**
- Shows winner details
- Shows item and ticket info
- Confirms approval email sent
- Link to view claim details

**Instructions Panel:**
- Step-by-step verification guide
- Clear process explanation

### 3. Claim Detail (`/logistics/claims/:claimId`)
**Purpose:** Manage individual claim and process handover

**Sections:**
- **Header:** Claim ID, status badges
- **Winner Information:** Name, email, user ID
- **Prize Information:** Item title, winning ticket
- **Pickup Information:** Pickup code, date, verification attempts
- **Timeline:** Visual timeline of claim progress
- **Actions:**
  - Resend pickup code
  - Process final handover (when approved)

**Auto-Refresh:**
- Refreshes every 10 seconds
- Real-time status updates
- Notifies when winner approves

**Status Indicators:**
- Yellow: Pending verification
- Blue: Verified (awaiting user approval)
- Green: Approved (ready for handover)
- Purple: Claimed (completed)
- Red: Expired

---

## Public Page

### Claim Approval (`/claim-approval/:approvalToken`)
**Purpose:** Winners approve their claim via email link

**User Experience:**
1. Click link in email
2. See loading state
3. Automatic approval processing
4. Success screen with:
   - Celebration animation
   - Item details
   - Pickup code reminder
   - Next steps instructions
   - Print option

**Error Handling:**
- Invalid token: Shows error, suggests retry
- Expired token: Shows error, contact support
- Already approved: Shows error with details

---

## Status Workflow

### Status Definitions

1. **pending_verification**
   - Initial state after winner requests pickup
   - Waiting for admin to verify at pickup location

2. **verified**
   - Admin has verified identity and pickup code
   - Approval email sent to winner
   - Waiting for winner to approve via email

3. **approved**
   - Winner has approved via email link
   - Ready for admin to complete final handover
   - Admin can now process the claim

4. **claimed**
   - Final state - item has been handed over
   - Completion email sent
   - No further actions needed

5. **expired**
   - Pickup window has passed
   - Claim no longer valid

### Status Transitions
```
pending_verification
         ↓ (admin verifies)
     verified
         ↓ (winner approves via email)
     approved
         ↓ (admin completes handover)
     claimed
```

---

## Key Features

### Admin Features
✅ Real-time status updates (auto-refresh)
✅ Comprehensive claim filtering
✅ Detailed winner information
✅ Pickup code management
✅ Resend pickup codes
✅ Add handover notes
✅ Visual timeline of events
✅ Statistics dashboard
✅ Status indicators

### Winner Features
✅ Email notifications at each step
✅ Simple approval process
✅ Pickup code reminders
✅ Next steps guidance
✅ Print confirmation
✅ Mobile-friendly approval page

### Security Features
✅ Approval tokens with expiration
✅ Admin authentication required
✅ Pickup code verification
✅ Identity verification
✅ Attempt tracking
✅ Rate limiting

---

## Email Notifications

### 1. Winner Notification (After Draw)
- Subject: "🎉 Congratulations! You Won [Item Name]"
- Content:
  - Winning ticket number
  - Item details
  - Pickup code
  - Pickup date/time
  - Location details
  - Instructions

### 2. Approval Request (After Verification)
- Subject: "Approve Your Prize Claim - [Item Name]"
- Content:
  - Claim details
  - Approval button/link
  - Expiration time
  - Support contact

### 3. Approval Confirmation
- Subject: "Claim Approved - Ready for Pickup"
- Content:
  - Confirmation message
  - Pickup code reminder
  - Next steps
  - What to bring

### 4. Final Confirmation (After Handover)
- Subject: "Prize Claimed Successfully - Thank You!"
- Content:
  - Completion message
  - Thank you note
  - Feedback request
  - Future raffle info

---

## API Integration

### Required Environment Variables
```
FRONTEND_URL=https://yoursite.com
EMAIL_SERVICE_CONFIGURED=true
```

### Error Handling
- Network errors: Show retry option
- Invalid data: Display clear error messages
- Token expiration: Guide to contact support
- Rate limiting: Show wait time

---

## Best Practices

### For Admins
1. Always verify ID before verification
2. Double-check pickup code entry
3. Add detailed handover notes
4. Confirm winner has approved before handover
5. Keep pickup location secure
6. Track verification attempts

### For Winners
1. Keep pickup code safe
2. Bring valid ID
3. Arrive on scheduled date
4. Approve claim promptly
5. Print confirmation page
6. Contact support if issues

---

## Troubleshooting

### Winner Can't Approve
**Solution:** Use "Resend Pickup Code" button in claim detail

### Approval Link Expired
**Solution:** Contact admin to resend from claim detail page

### Wrong Pickup Code
**Solution:** Admin can resend correct code from claim detail

### Winner Didn't Receive Email
**Solution:** Check spam folder, verify email address, use resend feature

---

## Statistics Tracked

- Total claims per item
- Claims by status
- Verification attempts
- Average approval time
- Completion rate
- Expired claims

---

## Future Enhancements

- [ ] SMS notifications option
- [ ] QR code scanning for pickup codes
- [ ] Multi-language support
- [ ] Photo upload at handover
- [ ] Digital signature capture
- [ ] Scheduled pickup slots
- [ ] Bulk claim processing
- [ ] Export claims report
- [ ] Analytics dashboard

---

## Support

For questions or issues:
- Admin Portal: Contact technical support
- Winners: Use support email in notification emails