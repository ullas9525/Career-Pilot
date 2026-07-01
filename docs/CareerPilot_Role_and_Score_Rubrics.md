# CareerPilot: Role and Score Rubrics
## Explicit Scoring Criteria with Real Examples

---

## PART 1: BACKEND/FULL-STACK ENGINEER ROLE

### Role Profile
**What they're hired for:**
- Write code that works, scales, and is maintainable
- Make architectural decisions with tradeoffs in mind
- Communicate technical decisions clearly
- Work well in teams

### Dimensions and Weights

**Technical Depth (40%)**
- Algorithm knowledge (coding, data structures)
- System design thinking (scalability, tradeoffs)
- Code correctness and quality
- Understanding of edge cases and failure modes

**Problem-Solving Approach (30%)**
- How systematically they break down problems
- How they ask clarifying questions
- How they validate their solution
- How they handle being stuck

**Communication (20%)**
- Explain their technical decisions clearly
- Walk through code logic step-by-step
- Acknowledge limitations of their approach
- Use clear technical vocabulary

**Culture Fit (10%)**
- Team collaboration attitude
- Openness to feedback
- Willingness to learn
- Growth mindset

---

### Score 0-2: Complete Failure
**What this looks like:**
- Cannot code or doesn't attempt to code
- No understanding of the problem
- Gives up when stuck
- Hostile or dismissive to feedback
- Cannot explain what they're doing

**Example Interview:**
```
Q: "Write a function to reverse a linked list"
A: "Um... I don't think I can do this. Can I use a library?"
Q: "Sure, what would that look like?"
A: "I don't know. I haven't done this before. Can we move on?"
```

**AI Scoring Notes:**
- No attempt to solve
- No explanation attempted
- Gives up immediately
- Score: 0-2

---

### Score 3-4: Well Below Expectation
**What this looks like:**
- Attempts to code but makes fundamental mistakes
- Doesn't understand basic data structures
- Code doesn't work or only works on simple cases
- Can't explain code logic
- Confused about tradeoffs

**Example Interview:**
```
Q: "Design a cache. What are the tradeoffs?"
A: "Uh, a cache is like... fast memory. I would use a HashMap I guess. 
   Tradeoffs are... um... I don't know. Size? Speed?"
Q: "What happens if you have more items than cache space?"
A: "It breaks? Or you get an error?"
Q: "How would you prevent that?"
A: "I... haven't thought about that."
```

**What's Wrong:**
- Very vague understanding of cache mechanics
- No mention of eviction policies (LRU, LFU, etc.)
- Can't think through tradeoffs systematically
- Doesn't anticipate basic problems

**AI Scoring Notes:**
- Understands concept vaguely (cache is fast memory)
- Cannot work through implications
- No systematic thinking
- Score: 3-4

---

### Score 5: Below Expectation
**What this looks like:**
- Can write basic code that works
- Understands the problem but misses nuances
- Code works on happy path, might miss edge cases
- Explanation is present but not clear
- Recognizes one tradeoff but misses others

**Example Interview:**
```
Q: "Design a rate limiter. How would you implement it?"
A: "I would use a queue. Each request goes into the queue. 
   If there are more than 10 requests in 1 second, reject it."
Q: "How do you know when 1 second has passed?"
A: "I would... check the current time? And if it's been 1 second, 
   remove old requests from the queue."
Q: "What if you have 1000 requests per second? Is your approach efficient?"
A: "Oh... probably not. Each request would need to check the queue. 
   That could be slow. But I'm not sure how to make it better."
```

**What's Missing:**
- Doesn't mention token bucket or sliding window algorithms
- Only acknowledges one problem (efficiency), doesn't fix it
- Implementation is correct for toy case but wouldn't scale
- Explanation lacks depth

**AI Scoring Notes:**
- Core logic is sound
- Recognizes limitations but doesn't solve them
- Missing algorithmic knowledge (token bucket, etc.)
- Score: 5

---

### Score 6: Meets Expectation (Lower End)
**What this looks like:**
- Can write code that works for most cases
- Understands the problem well
- Explains code logic clearly
- Recognizes most tradeoffs
- May miss some edge cases but would catch them with hints

**Example Interview:**
```
Q: "Design a URL shortener. What would you consider?"
A: "So I'd need a few components:
   1. A hash function to create short codes
   2. A database to store the mapping of short code → long URL
   3. A way to handle collisions
   
   For the hash, I could use MD5 or SHA, then take the first 6 characters.
   For collisions, I'd check if that code exists, and if so, use 7 characters.
   
   For the database, I'd use a key-value store like Redis for speed.
   
   Tradeoffs:
   - Using shorter codes is faster but more collision risk
   - Using longer codes is safer but less user-friendly
   - Redis is fast but limited capacity, so I'd also have a persistent DB backup"
   
Q: "What if you get a million requests per second?"
A: "Oh... that's a lot. I'd probably need to:
   - Use multiple Redis instances (sharding)
   - Load balance across them
   - Maybe cache popular URLs"
```

**What's Good:**
- Systematic approach to the problem
- Multiple components identified correctly
- Tradeoffs mentioned explicitly
- Recognizes need to scale

**What's Missing:**
- Doesn't think deeply about distributed system challenges (clock skew, consistency)
- Sharding approach is correct but not detailed
- Doesn't mention monitoring/alerting

**AI Scoring Notes:**
- Solid understanding
- Clear explanation
- Identifies key tradeoffs
- Can think through scaling at basic level
- Score: 6

---

### Score 7: Meets Expectation (Upper End)
**What this looks like:**
- Code is clean, works on edge cases
- Deep understanding of the problem
- Explains not just what but why
- Thinks through multiple tradeoffs explicitly
- Asks good clarifying questions
- Can optimize when asked

**Example Interview:**
```
Q: "Design a distributed cache for a social media platform."
A: "Let me clarify a few things first:
   - What's the data we're caching? User profiles, feed, posts?
   - What's the scale? Millions of users?
   - How critical is consistency? Can we have stale data?
   
   [Interviewer clarifies: Social feed, 100M users, some staleness OK]
   
   A: So my approach:
   1. Use consistent hashing to shard data across multiple cache nodes
   2. Each user's feed is cached separately
   3. When a new post is created, invalidate the relevant feed caches
   
   Tradeoffs to consider:
   - Consistency vs availability: We're choosing availability (can show stale feeds)
   - Cache invalidation complexity: When a user posts, we need to invalidate 
     multiple follower caches. This is hard at scale. I'd use a message queue 
     to handle this asynchronously.
   - Replication: Each cache node should be replicated for fault tolerance
   
   Potential issues:
   - Thundering herd: If a hot post cache expires, millions request it at once. 
     I'd use probabilistic early expiration or locking to prevent this.
   - Cache penetration: If a user has no posts, they get cache misses. 
     I'd cache negative results with a short TTL."
     
Q: "What if a cache node goes down?"
A: "The consistent hashing means only keys for that node are affected. 
   Since each key is replicated on a backup node, we have redundancy. 
   On failure, requests go to the replica. For the missing replica, 
   we'd use a write-through pattern or re-replicate from the primary."
```

**What's Good:**
- Asks clarifying questions first
- Thinks about edge cases (thundering herd, cache penetration)
- Knows multiple patterns (consistent hashing, probabilistic expiration, etc.)
- Explains tradeoffs in detail
- Can reason about failures

**What's Missing:**
- Doesn't dive into monitoring or alerting
- Doesn't mention testing strategy
- Doesn't quantify (latency targets, hit rate targets)

**AI Scoring Notes:**
- Strong technical knowledge
- Good problem-solving approach
- Thinks about edge cases
- Clear communication
- Score: 7

---

### Score 8: Strong Candidate
**What this looks like:**
- Code is production-ready
- Deep systems thinking (not just solving the problem, but solving it right)
- Thinks about monitoring, alerting, testing
- Quantifies tradeoffs ("This latency matters because...")
- Catches interviewer's tricks
- Suggests improvements to their own solution

**Example Interview:**
```
Q: "Design a real-time notification system."
A: "Okay, let me understand the requirements:
   - Real-time means <1 second latency?
   - What's the scale? Millions of notifications per second?
   - Does every notification need to be delivered?
   
   [Interviewer confirms: Yes, <1 sec, 10M/sec, 99.9% delivery]
   
   This is hard. Let me think through the architecture:
   
   Producer side:
   - Events come in (user liked a photo, comment, etc.)
   - Push to a message queue (Kafka) - gives us durability and ordering per user
   
   Processing:
   - Consumer reads from Kafka, determines who needs to be notified
   - For each recipient, format the notification and push to another queue
   
   Delivery:
   - WebSocket connection to each user device
   - Store undelivered notifications in Redis for quick access
   - If user is offline, store in a persistent DB
   - When they reconnect, fetch stored notifications
   
   Key design decisions:
   1. Why Kafka? It guarantees ordering per partition (per user in this case)
   2. Why Redis for online notifications? 10M/sec means we can't hit DB every time
   3. Why persistent DB for offline? Redis is volatile, users need their notifications
   
   Potential issues and solutions:
   - Duplicate notifications: Idempotent operations (use notification ID as key)
   - Ordering: Kafka partitions by user ID, so messages are ordered per user
   - Scale: Shard Kafka topics, shard Redis by user hash
   - Failure: Dead letter queue for failed notifications, retry with exponential backoff
   
   Monitoring:
   - Track end-to-end latency (time from event to delivery)
   - Monitor queue depths (if queue grows, we're falling behind)
   - Alert on delivery failures
   - Track duplicate rates"
     
Q: "What if Kafka goes down?"
A: "Kafka has replication built-in. If the leader goes down, 
   a replica becomes the new leader. But we could lose in-flight messages.
   To handle this, we'd:
   1. Configure acks=all (wait for all replicas to confirm)
   2. Use a circuit breaker on the producer side
   3. Fall back to a slower (but more reliable) delivery method temporarily"
```

**What's Excellent:**
- Thinks about monitoring and observability
- Quantifies decisions ("10M/sec means we can't hit DB")
- Knows multiple technologies and when to use each
- Thinks about failure modes proactively
- Clean, systematic explanation
- Suggests improvements without being asked

**What Could Be Better:**
- Doesn't mention data consistency guarantees explicitly
- Could quantify SLAs more (p99 latency, etc.)

**AI Scoring Notes:**
- Very strong technical foundation
- Thinks about production concerns (monitoring, failure modes)
- Clear communication
- Makes good tradeoffs
- Score: 8

---

### Score 9: Exceptional Candidate
**What this looks like:**
- Everything in 8, plus:
- Thinks about compliance, security, privacy
- Considers business implications
- Optimizes for real-world constraints
- Challenges assumptions constructively
- Knows when to keep it simple vs when to get complex

**Example Interview:**
```
Q: "Design a payment processing system."
A: "Before I design, I need to understand:
   - Is this for internal company payments or customer payments?
   - What regulations apply? PCI DSS? GDPR?
   - What's the failure tolerance? (Can we lose a transaction?)
   - What's the fraud tolerance?
   
   [Interviewer: Customer payments, PCI compliance needed, <0.01% loss acceptable]
   
   This is complex because of regulatory requirements. Let me think through it:
   
   Constraints:
   - PCI DSS means we can't store raw credit cards
   - We need audit logging for every transaction
   - Payment gateways (Stripe, etc.) are probably the right choice, 
     but let me think through pros/cons
   
   Approach:
   - Frontend sends encrypted card to payment gateway (not our servers)
   - Gateway returns a token
   - We process the token (never touch raw card data)
   - Store encrypted transaction record
   - Use idempotent operation IDs to prevent double-charging
   
   I'm using a payment gateway because:
   - Compliance: They handle PCI compliance
   - Security: We don't hold card data
   - Risk: If we build this ourselves, we're liable for breaches
   - Cost: It's cheaper to use a gateway than build + maintain + secure ourselves
   
   Where we DO need to be careful:
   - Reconciliation: Transactions in our system must match gateway records
   - Refunds: Idempotency ID must cover refunds too
   - Webhooks: Async notifications from gateway must be verified (signature validation)
   - Fraud detection: We should implement rules (velocity checks, etc.)
   
   Anti-patterns to avoid:
   - Storing partial card data (still PCI regulated)
   - Building our own crypto (use TLS + gateway encryption)
   - Not handling webhook failures (message could be lost)
   
   This is an intentionally simple design because payment processing 
   is one of the few places where using a third-party solution is better 
   than building custom."
```

**What's Exceptional:**
- Thinks about compliance and business risk
- Knows when NOT to build custom solutions
- Mentions real failure modes (webhook delivery, reconciliation)
- Explains WHY certain decisions (not just WHAT)
- Practical, grounded thinking

**AI Scoring Notes:**
- Thinks about real-world complexity
- Balances technical and business needs
- Knows industry best practices
- Score: 9

---

### Score 10: Hire Immediately
**What this looks like:**
- Everything in 9, plus:
- Teaches the interviewer something
- Shows mastery of multiple domains
- Makes creative solutions to hard problems
- Identifies edge cases nobody else thinks of
- Incredibly clear communicator

**Example Interview:**
```
Q: "Design a system to process 1 billion events per day with 
    strict ordering guarantees per user and 99.99% accuracy."
    
A: "This is actually a really interesting problem because these 
    constraints are in tension. Let me think out loud:
    
    The core tension:
    - Strict ordering per user suggests a single queue per user
    - But 1B events/day = 11k events/sec average
    - If we have 100M users, that's 0.11 events/sec per user on average
    - But distribution is not uniform. Some users are hot (celebrities, etc.)
    
    So we can't just partition by user count. We need to partition by traffic.
    
    Architecture:
    - Event ingestion: Multiple load-balanced endpoints
    - Ordering: Partition Kafka by user ID, but with dynamic rebalancing 
      for hot users
    - Processing: Idempotent consumers with exactly-once semantics
    - Accuracy: Implement a reconciliation job that compares our processed 
      count with raw event count
    
    The trick here is the reconciliation:
    - It's expensive to run (scans all data), so we do it periodically (hourly)
    - When we find discrepancies, we have a way to replay events 
      (using event sourcing)
    - This gives us a safety net: even if we lose/duplicate events, 
      we can detect and fix it
    
    Failure modes:
    - Kafka leader dies → handled by replication
    - Consumer crashes → offset management ensures no data loss
    - Duplicate events from clients → idempotent operation keys
    - Discrepancies → reconciliation job catches them
    
    One thing that's not obvious: Why not use a distributed transaction 
    (like 2-phase commit)? Because at this scale, the coordination overhead 
    makes it impossible. So instead, we use eventual consistency + 
    reconciliation. It's slower to detect issues but much faster at processing."
```

**What's Extraordinary:**
- Thinks about real-world constraints (hotspots, skewed distribution)
- Knows advanced patterns (event sourcing, idempotency keys, reconciliation)
- Explains why certain approaches DON'T work and why
- Shows deep systems knowledge

**AI Scoring Notes:**
- Mastery level
- Can solve very hard problems
- Clear thinking under pressure
- Score: 10

---

## PART 2: FRONTEND ENGINEER ROLE

### Role Profile
**What they're hired for:**
- Write UI that users love and that works across browsers
- Understand JavaScript deeply
- Performance optimization
- Work with designers and backends
- Handle state management well

### Dimensions and Weights

**Technical Depth (35%)**
- JavaScript/TypeScript knowledge
- CSS and styling (flexbox, grid, responsive)
- Browser APIs and DOM manipulation
- Component architecture

**Problem-Solving (25%)**
- How to debug UI issues
- Performance optimization (lazy loading, code splitting, etc.)
- State management approach
- Handling edge cases

**User-Centric Thinking (20%)**
- Accessibility (a11y) considerations
- User experience awareness
- Performance from user perspective
- Mobile considerations

**Communication (15%)**
- Explain technical decisions clearly
- Work with designers
- Discuss tradeoffs

**Culture Fit (5%)**
- Collaboration
- Growth mindset

---

### Score 5: Below Expectation

**Example Interview:**
```
Q: "Build a searchable todo list. What would you consider?"
A: "I would create a component that has a list of todos 
   and a search input. When you type in the search, 
   it filters the list."
Q: "How would you implement the filtering?"
A: "I would... filter the array? Like, todos.filter(t => t.includes(searchTerm))"
Q: "What if you have 10,000 todos?"
A: "Oh... then that could be slow? But I'm not sure how to make it faster."
Q: "What about accessibility?"
A: "Um... I didn't think about that. What does that mean?"
```

**What's Missing:**
- Doesn't think about performance (filtering 10k items on every keystroke)
- Doesn't know about debouncing/throttling
- No mention of accessibility
- Only happy path implementation

**Score: 5**

---

### Score 6: Meets Expectation (Lower)

**Example Interview:**
```
Q: "Build a searchable todo list."
A: "I would:
   1. Have a state for todos and search term
   2. Filter todos based on search term
   3. Display the filtered list
   
   For performance, I'd debounce the search input 
   so it doesn't filter on every keystroke.
   
   I'd use input onInput handler:
   - Debounce with 300ms delay
   - Then filter and update state
   
   CSS: I'd make it responsive with flexbox"
   
Q: "What about if someone searches and no results?"
A: "I'd show a 'No results' message"
Q: "How would a screen reader user experience this?"
A: "Hmm... I guess they'd hear the results change? 
   I'm not really sure about accessibility best practices."
```

**What's Good:**
- Knows debouncing concept
- Thinks about performance
- Responsive design with flexbox
- Handles no-results case

**What's Missing:**
- Doesn't mention ARIA labels or semantic HTML
- Doesn't think about keyboard navigation
- Doesn't test accessibility

**Score: 6**

---

### Score 7: Meets Expectation (Upper)

**Example Interview:**
```
Q: "Build a searchable todo list with accessibility."
A: "Okay, here's my approach:
   
   Structure:
   - Semantic HTML: <input type='search'>, <ul> for list
   - ARIA labels: aria-label for search, aria-live for results
   - role='searchbox' for the input
   
   Behavior:
   - Debounce search (300ms)
   - Highlight matching text
   - Keyboard navigation: arrow keys to move through results
   - Enter to select
   
   Accessibility:
   - aria-live='polite' on results region so screen readers announce when list changes
   - aria-label on the search input: 'Search todos'
   - Use semantic elements (button, input, etc.)
   - Keyboard-accessible: can tab through entire UI
   
   Performance:
   - Debounce the search
   - Use useCallback to prevent unnecessary re-renders
   - Only re-render the results, not the whole component"
   
Q: "What if someone has JavaScript disabled?"
A: "Oh... good point. With JS disabled, search wouldn't work. 
   To handle this, I could:
   - Add a noscript fallback with server-rendered results
   - Or just show all todos and let the browser's find function (Ctrl+F) work"
```

**What's Good:**
- Knows accessibility features (ARIA, semantic HTML)
- Keyboard navigation
- Performance optimization (debounce, useCallback)
- Handles edge case (JS disabled)

**What's Missing:**
- Doesn't mention testing accessibility
- Doesn't think about mobile touch interactions
- Could mention more performance optimizations (virtualization for very large lists)

**Score: 7**

---

### Score 8: Strong Candidate

**Example Interview:**
```
Q: "Build a searchable todo list that needs to handle 100k items."
A: "With 100k items, we have a rendering problem. Here's my approach:
   
   1. Virtual scrolling
   - Only render visible items (maybe 20 at a time)
   - Use a library like react-window
   - This makes scroll instant even with 100k items
   
   2. Search optimization
   - Don't filter all 100k items on every keystroke
   - Use debounce + RequestAnimationFrame for smooth updates
   - Consider indexing for very large datasets (trie or something)
   
   3. Accessibility with virtualization
   - Screen readers need to know about items outside viewport
   - Use aria-rowcount, aria-rowindex to help
   - Implement keyboard navigation carefully (can't just tab through all 100k)
   
   4. Testing
   - Unit tests for filtering logic
   - Accessibility audit with axe or pa11y
   - Performance test: ensure no jank even with 100k items
   
   5. Edge cases
   - What if search returns 50k items? Still need virtual scrolling
   - What if user has slow device? Progressively enhance
   - What if network is slow and data loads gradually?
   
   I'd probably use a combination:
   - Client-side search for <10k items
   - Server-side search + pagination for >10k items
   - This balances UX and server load"
```

**What's Excellent:**
- Thinks about scale and real constraints
- Knows virtualization technique
- Considers accessibility with complex interactions
- Mentions testing
- Makes pragmatic choices (server-side search at scale)

**Score: 8**

---

### Score 9: Exceptional

**Example Interview:**
```
Q: "Design a real-time collaborative todo list like Google Docs."
A: "This is actually really hard because of conflict resolution. 
   Let me think through it:
   
   Core problem:
   - Two users edit simultaneously
   - Changes must merge without data loss
   - Order must be preserved
   
   Approaches:
   1. Last write wins: Simple but loses data
   2. Operational transformation (OT): Complex but works (Google Docs uses this)
   3. CRDT (Conflict-free Replicated Data Type): Easier to understand
   
   I'd use CRDT because:
   - Each operation can be applied in any order
   - No coordination needed between clients
   - Automatic conflict resolution
   
   Implementation:
   - Use a CRDT library (Automerge, Yjs)
   - Each todo has unique ID (UUID)
   - Each edit is a timestamped operation
   - Merge algorithm ensures consistency
   
   UI challenges:
   - Show real-time updates from other users
   - Handle undo/redo with shared state
   - Maintain UI responsiveness during merge
   
   Accessibility:
   - announce changes from other users: 'John added a todo'
   - Don't distract with too many announcements
   - Let user control notification verbosity
   
   Performance:
   - Don't sync every keystroke
   - Batch operations and sync every 500ms
   - Use debounce
   - Only send changed data
   
   The tricky part is balancing:
   - Latency: Want immediate feedback for current user
   - Consistency: Want all users to see same data
   - Efficiency: Don't send entire state on every change
   
   Solution: Optimistic updates + eventual consistency
   - Show changes immediately to current user
   - Send to server
   - Merge with other users' changes
   - All users converge to same state"
```

**What's Extraordinary:**
- Knows advanced patterns (CRDT, operational transformation)
- Thinks about conflict resolution
- Balances UX, accessibility, and technical complexity
- Makes good engineering decisions

**Score: 9**

---

## PART 3: PRODUCT MANAGER ROLE

### Role Profile
**What they're hired for:**
- Understand users and what they need
- Make strategic product decisions
- Communicate with engineers and designers
- Own the product roadmap
- Balance business, user, and technical needs

### Dimensions and Weights

**Communication & Strategy (50%)**
- Can articulate product vision clearly
- Thinks about user needs
- Makes case for product decisions
- Communicates with stakeholders

**Analytical Thinking (20%)**
- Data-driven approach
- Metrics-focused
- Understands tradeoffs

**Leadership (15%)**
- Influence without authority
- Stakeholder management
- Decision-making clarity

**Product Sense (15%)**
- Understands user behavior
- Competitive awareness
- Feature prioritization

---

### Score 5: Below Expectation

**Example Interview:**
```
Q: "Tell me about a product decision you made."
A: "We decided to add a dark mode because customers asked for it."
Q: "Why did they ask for it?"
A: "They said it's easier on the eyes."
Q: "How many customers asked for it?"
A: "I don't know... maybe 10 or so?"
Q: "How did that affect your roadmap?"
A: "We just added it. It took 2 weeks."
Q: "Did you measure if it was successful?"
A: "We didn't really measure it. But people seem happy?"
```

**What's Missing:**
- No data gathering (why did only 10 ask?)
- No metrics to measure success
- No consideration of opportunity cost
- No strategic thinking
- Decisions are reactionary

**Score: 5**

---

### Score 6: Meets Expectation (Lower)

**Example Interview:**
```
Q: "How do you approach a new feature?"
A: "I would:
   1. Talk to customers to understand what they need
   2. Look at data to see if it's a real problem
   3. Write a spec for the engineers
   4. Work with design to create mockups
   5. Launch and measure results
   
   For example, we noticed 30% of users were abandoning their carts. 
   We talked to them and found checkout was confusing. 
   So we simplified the checkout flow."
   
Q: "What metrics did you use to measure success?"
A: "We tracked cart abandonment rate. After the change, 
   it dropped to 25%. So it was successful."
   
Q: "Did you consider other solutions?"
A: "Not really. Simplifying checkout seemed like the obvious fix."
```

**What's Good:**
- Talks to customers
- Uses some data
- Measures results
- Thinks about the problem

**What's Missing:**
- Doesn't consider alternatives (maybe add trust signals? show item details?)
- Doesn't think about tradeoffs
- Doesn't go deeper on "why" (was it really clarity, or was it trust?)
- Didn't test multiple solutions

**Score: 6**

---

### Score 7: Meets Expectation (Upper)

**Example Interview:**
```
Q: "Walk me through a product decision."
A: "We had a problem: 30% cart abandonment, which was hurting revenue.
   
   First, I talked to 20 customers to understand why:
   - 40% didn't trust the payment (security concern)
   - 35% found checkout confusing
   - 25% had shipping concerns
   
   This told me there wasn't ONE problem, but several.
   
   I then looked at data:
   - Where do they drop? (Payment page = 60% of dropoff)
   - How long does checkout take? (6 steps, 3 minutes)
   - What's our benchmark? (Competitors: 3 minutes, industry avg: 2.5)
   
   Potential solutions:
   1. Simplify checkout flow (would fix confusion but not trust)
   2. Add security badges (would fix trust but not complexity)
   3. Show shipping estimate upfront (would fix shipping concerns)
   
   Instead of picking one, I proposed:
   - Add security badges on payment page (addresses biggest concern)
   - Reduce checkout to 4 steps (addresses complexity, quick win)
   - Show shipping estimate earlier (addresses shipping)
   
   We prioritized:
   - Security badges first (highest impact, lowest effort)
   - Then redesign (higher effort but bigger impact)
   - Shipping estimate as nice-to-have
   
   Results:
   - Security badges: 25% reduction in payment page abandonment
   - Redesigned checkout: 30% improvement overall
   - Total effect: 28% → 18% abandonment (36% improvement)
   
   Key metric to watch: Revenue per user (ultimate goal)
   - Before: $150 average
   - After: $195 average (30% lift!)
   
   But I was careful not to over-optimize checkout.
   If abandonment had been 5%, it wouldn't be worth the effort.
   At 30%, it was clearly a problem."
```

**What's Excellent:**
- Digs deep into "why" (talks to customers)
- Uses data systematically
- Considers multiple solutions
- Prioritizes based on impact and effort
- Connects to business metrics (revenue, not just engagement)
- Explains tradeoffs

**What Could Be Better:**
- Doesn't mention testing multiple variations simultaneously (A/B test)
- Doesn't talk about what happened to the metric long-term (was improvement sustained?)
- Doesn't mention what to measure next

**Score: 7**

---

### Score 8: Strong PM

**Example Interview:**
```
Q: "How do you prioritize the roadmap?"
A: "This is really hard because there are always more ideas than capacity.
   
   My approach:
   1. Define success metrics for each initiative
   2. Estimate impact (revenue, user growth, retention, etc.)
   3. Estimate effort (engineering, design, my time)
   4. Calculate ROI: Impact / Effort
   5. Prioritize high ROI items
   
   But here's the thing: Sometimes low ROI items are worth doing.
   
   Example: A feature has lower ROI but solves a core pain point
   for 10% of users who are about to churn. That's worth doing because
   retention is more valuable than acquisition.
   
   I also think about:
   - Strategic bets: Some things don't have immediate ROI but 
     build capabilities for the future
   - Customer satisfaction: Some things aren't metrics-driven but 
     keep customers happy
   - Competitive positioning: Sometimes you do something because 
     competitors are doing it
   
   So my roadmap isn't just ROI-ranked. It's a mix:
   - 60% high-ROI features
   - 20% strategic bets
   - 15% customer satisfaction (reduce pain)
   - 5% competitive moves
   
   I review this quarterly because priorities change:
   - If we lose a big customer, we pivot
   - If market shifts, we adjust
   - If we hit our numbers, we take more risks
   
   Communication is key:
   - I tell engineering: 'Here's the roadmap and WHY'
   - I tell customers: 'Here's what's coming and why'
   - I tell leadership: 'Here's the tradeoff'
   
   One thing I learned: If you can't explain WHY something is on the 
   roadmap, it probably shouldn't be. That's a sign you're not being 
   strategic."
```

**What's Excellent:**
- Systematic prioritization framework
- Understands business impact beyond surface metrics
- Knows when to break the framework (retaining customers > pure ROI)
- Thinks about strategic positioning
- Reviews and adjusts based on reality
- Emphasizes communication

**Score: 8**

---

### Score 9: Exceptional PM

**Example Interview:**
```
Q: "Tell me about your biggest product failure."
A: "We built a feature that everyone thought was great, 
   but it completely failed. Here's what happened:
   
   The setup:
   - Customers asked for better collaboration (10+ customers requested it)
   - We assumed this was important
   - Built a whole collaboration suite
   - Launched to big fanfare
   - Usage: 2% of users tried it, <1% used it regularly
   
   What I got wrong:
   - I listened to power users but forgot about average users
   - I assumed 'asking for it' = 'will use it'
   - I didn't validate the problem deeply enough
   - I fell in love with the solution, not the problem
   
   The painful lesson:
   - Those 10 customers who asked? They represent 10% of our user base
   - The other 90%? They use our product solo, don't need collaboration
   - I was optimizing for a minority use case
   
   What I should have done:
   - Survey all users: 'How many of you collaborate?' (Probably 5-10%)
   - Test with a smaller, cheaper MVP
   - Actually measure whether people use it before building full solution
   - Ask myself: 'Is this a need or a want?'
   
   Recovery:
   - We didn't kill it immediately (sunk cost fallacy tried to keep it alive)
   - But we stopped investing heavily
   - Slowly sunset it over 6 months
   - Lost reputation with those power users but regained focus
   
   The insight:
   - Default to listening to the majority, not the most vocal minority
   - Test before you build
   - Real validation is usage, not requests
   - Sometimes saying no is more important than saying yes"
```

**What's Extraordinary:**
- Shows vulnerability and learning
- Understands cognitive biases (sunk cost, listening to loud customers)
- Knows the difference between need vs want
- Thinks about user segmentation
- Can make hard calls (sunset features)
- Reflects and improves

**Score: 9**

---

### Score 10: Hire Immediately

**Example Interview:**
```
Q: "How would you enter a new market that's 10x bigger 
    but has established competitors?"
    
A: "This is a strategic question, not just execution. Let me think through it:
   
   First, the hard questions:
   - Why do we want to enter this market?
   - What's our unfair advantage?
   - Can we win, or are we setting ourselves up for failure?
   
   I would:
   1. Understand the existing market deeply
      - Who are the customers?
      - What are they paying for?
      - Where is the pain? (Not solving pain = we'll lose)
   
   2. Understand why competitors haven't solved it
      - Is it technical? (We can't beat them)
      - Is it business model? (We might have advantage)
      - Is it distribution? (We might have advantage)
      - Is it customer segment? (We might have advantage)
   
   3. Find our wedge
      - We can't beat incumbents head-to-head
      - We need to find a niche or angle they're underserving
      - Examples: 
        * Stripe entered when payment processing was complex
        * They focused on developers, not enterprises
        * That was a gap incumbents weren't filling
      
   4. Test before scaling
      - Build MVP for specific niche
      - Measure: Can we acquire customers? Are they happy?
      - If yes: Expand to adjacent niches
      - If no: Pivot
   
   5. Prepare for long game
      - Entering new market is 2-3 year commitment minimum
      - We need to set expectations with leadership
      - We need to hire people who understand that market
      - We need to be patient
   
   6. Have exit criteria
      - If we don't reach X revenue in Y years, we exit
      - If a big competitor copies us, do we have advantages?
      - If the market doesn't exist, we pivot
   
   The hardest part: Knowing when to exit
      - Sunk cost fallacy is real
      - Sometimes the right answer is 'this isn't working'
      - But you need conviction to make that call
   
   I would NOT recommend entering this market unless:
   - We have unique advantage competitors don't have
   - We've validated that customers have the pain point
   - We have 18+ months of runway to test
   - We have leadership support for the long game"
```

**What's Extraordinary:**
- Thinks strategically (market entry, competitive positioning)
- Asks right questions first
- Understands business dynamics
- Knows psychological biases
- Has conviction to say no to bad ideas
- Makes long-term bets
- Balances ambition with pragmatism

**Score: 10**

---

## PART 4: SUMMARY RUBRIC TEMPLATE

For any role, score using this framework:

**Score 0-2:** Cannot perform job, fundamental knowledge gaps, gives up
**Score 3-4:** Below expectations, misses key concepts, limited problem-solving
**Score 5:** Below expectations but trainable, understands basics, misses nuances
**Score 6:** Meets expectations (lower), works for most cases, some gaps
**Score 7:** Meets expectations (upper), good all-around, shows depth
**Score 8:** Strong candidate, thinks about edge cases, production-ready thinking
**Score 9:** Exceptional, teaches interviewer, mastery level
**Score 10:** Hire immediately, rare talent, exceptional problem-solver

---

## How to Use These Rubrics

**For AI Scoring:**
1. Student does practice interview
2. AI extracts key points from transcript
3. AI maps to "score X example" for that role
4. AI assigns score based on match
5. AI provides feedback: "Your answer was like Score 6 example, try Score 7 next time"

**For Manual Review:**
1. Read transcript of practice interview
2. For each dimension (Technical Depth, Communication, etc.)
3. Find which example it matches most closely
4. Assign score for that dimension
5. Weight and calculate final score

**Key Rule:**
- Examples are more important than descriptions
- Show student EXACTLY what a 6 vs 7 looks like
- Let them compare their answer to the examples
- This is how they improve

---

## PART 5: RUBRIC EXPANSION ROADMAP

Currently, detailed score examples exist for only a subset of supported roles. The following is a structured expansion roadmap showing how additional roles will be added over time while keeping the scoring methodology consistent.

*(Note: Do not implement these rubrics now. This is a roadmap for future expansion.)*

### Roles Scheduled for Future Rubric Expansion

- Data Scientist
- Data Engineer
- Machine Learning Engineer
- DevOps Engineer
- Cloud Engineer
- Cybersecurity Analyst
- QA/Test Engineer
- Mobile App Developer
- Embedded Systems Engineer
- HR Interview
- Business Analyst
- UI/UX Designer
- System Administrator
- Site Reliability Engineer (SRE)

### Future Implementation Requirements

For **every future role** added to this documentation, the following components must be strictly defined to maintain scoring consistency:

1. **Define Role Profile:** A brief description of the role's core responsibilities and expectations.
2. **Define Evaluation Dimensions:** The specific criteria the role is evaluated on (e.g., Technical Depth, Design Sense, Communication).
3. **Define Weights:** The percentage importance of each dimension, totaling 100%.
4. **Define Score Bands:** A high-level description of what scores 0-10 mean for this specific role.
5. **Provide Realistic Interview Examples:** The most critical component. Concrete, transcribed examples of student answers demonstrating a bad answer (Score 3), an average answer (Score 6), a good answer (Score 7), and an extraordinary answer (Score 10).
