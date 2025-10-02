Great follow-up! Let's now talk about the **Host ID** — the part of an IP address that identifies a specific **device** (or host) **within a network**.

---

### 🧠 **What is a Host ID?**

The **Host ID** is the portion of an IP address that is **not** used for the Network ID. It identifies **individual devices** on the same network.

For example, in the IP address `192.168.1.10` with subnet mask `255.255.255.0`:

* **Network ID** = `192.168.1.0`
* **Host ID** = `0.0.0.10` → the unique part of the address **within** that network

---

### 📏 **Rule for Host ID**

> **Host ID = IP Address AND (Inverted Subnet Mask)**

The **inverted subnet mask** (also called the **wildcard mask**) has 1s where the Host ID bits are.

---

### 🧮 **Example**

* IP Address: `192.168.1.10`
* Subnet Mask: `255.255.255.0`
  → Binary: `11111111.11111111.11111111.00000000`
* Inverted Mask (Wildcard): `00000000.00000000.00000000.11111111`

Now, apply bitwise AND:

```
IP:      11000000.10101000.00000001.00001010
Mask:    00000000.00000000.00000000.11111111
Result:  00000000.00000000.00000000.00001010
```

✅ **Host ID = 0.0.0.10** (or just `.10` in this network)

---

### 📌 **Host ID Rules**

1. **The Host ID must be unique within a subnet** (no two devices can share it).
2. **All 0s in Host ID** = **Network address** (reserved).
3. **All 1s in Host ID** = **Broadcast address** (also reserved).
4. **Valid Host IDs are the values in between.**

---

### 🧮 Valid Host ID Range Example

For `192.168.1.0/24` (i.e. subnet mask `255.255.255.0`):

* Network ID: `192.168.1.0`
* Broadcast Address: `192.168.1.255`
* ✅ Valid Host IDs: `192.168.1.1` to `192.168.1.254`
  (254 possible hosts)

---

Would you like to try calculating the Host ID of an address yourself? Or want help with CIDR notation like `/26` or `/30`?
