
---

### 2. `ASSUMPTIONS.md`

```markdown
# Assumptions Made During Development

During the design and implementation of the Hero Cycles Pricing Engine, the following assumptions were made to keep the system focused and within the given constraints:

1. **No Authentication / User Roles** – The system is a simple internal tool; any user can access all features.

2. **No Tax Calculation** – Tax (GST, etc.) is out of scope. Prices are quoted inclusive of tax or tax is handled separately offline.

3. **No Inventory Management** – Stock levels are not tracked. Every part is assumed to be available.

4. **No Shipping / Delivery Logic** – Delivery charges are not part of the pricing engine; only the component total and optional discount are considered.

5. **Parts Are Independent** – Any part can be used in any cycle configuration. No compatibility rules (e.g., frame size vs tyre size) are enforced.

6. **Cycles Are Templates** – A cycle configuration is a reusable template; it is not tied to a specific sale. Each sale creates a separate quote snapshot.

7. **Price History Is Automatic** – Every price update pushes an entry into `priceHistory` with a timestamp and reason.

8. **Active / Inactive Parts** – Only active parts can be added to cycles; inactive parts are hidden from selection.

9. **Quantity Per Component** – Each component can have a quantity >1 (e.g., two tyres). The maximum quantity is not restricted.

10. **Currency** – All prices are in INR (₹); no currency conversion is required.

11. **No Real‑time Notifications** – Price changes do not trigger alerts; users must refresh the UI to see updated prices.

12. **Frontend Simplicity** – The UI uses plain CSS without any external component libraries, to minimise dependencies and keep the build lightweight.