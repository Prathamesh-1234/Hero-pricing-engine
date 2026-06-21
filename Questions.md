# Questions Asked While Analysing the Problem

Before starting development, I considered the following questions to clarify the scope and requirements:

1. **How frequently do part prices change?** – The system should support ad‑hoc updates; historical tracking is useful.

2. **Do we need to track the reason for a price change?** – Yes, adding a reason helps in audit trails.

3. **Is there any discount or promotion logic required?** – The assignment did not mention discounts, but I added a simple discount field to quotes (percentage/fixed) as a practical enhancement.

4. **Can a cycle have multiple parts from the same category?** – The assignment says “any part can be used in any cycle”, but to keep it realistic, I assumed a cycle should not have two frames or two gear sets. However, the final implementation does not strictly enforce category uniqueness to allow maximum flexibility – it only prevents duplicate part entries.

5. **Should quotes reference parts by ID or store the price value?** – Must store the price value (snapshot) to preserve historical accuracy.

6. **Is there a need to edit or delete quotes?** – Not required; once generated, quotes are immutable. Status (draft, sent, accepted, etc.) can be added later if needed.

7. **What happens when a part is deleted?** – We use a soft delete via `isActive` flag. Historical cycles and quotes retain the part reference; active cycles should not include inactive parts.

8. **Should the system support bulk price updates?** – The backend has a method for that, but the frontend does not expose it. It could be added later.

9. **What is the expected user persona?** – Sales team members who are not technical; the UI should be intuitive and straightforward.

10. **Is there any reporting or dashboard requirement?** – Not explicitly; we have a simple quote history list.

11. **How should the pricing engine be used?** – A salesperson selects a cycle configuration, sees the breakdown, and can generate a quote for a customer.

12. **Do we need to handle concurrency (two users updating same part)?** – Not required; MongoDB’s document‑level atomicity is sufficient for this scale.

13. **What about error handling?** – All API endpoints return meaningful error messages with appropriate HTTP status codes.

14. **Should we seed the database with sample data?** – Yes, to make it easy for evaluators to test the application without manual setup.

15. **Is there a need for logging or analytics?** – Not required; the focus is purely on the pricing engine.