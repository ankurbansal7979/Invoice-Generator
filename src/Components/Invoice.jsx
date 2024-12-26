import React, { useState  ,} from "react";
import { useNavigate } from "react-router-dom";
import Bill from "./Bill";

function Invoice() {
  const [invoiceDetails, setInvoiceDetails] = useState({
    billDate: "",
    invoiceNumber: "",
    customerName: "",
    shopkeeperName: "",
    discount: 0,
  });

  const [items, setItems] = useState([]);
  const [mainData, setMainData] = useState({});
  const [isHidden, setIsHidden] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInvoiceDetails({ ...invoiceDetails, [name]: value });
  };

  const handleItemChange = (e, index) => {
    const { name, value } = e.target;
    const updatedItems = [...items];
    updatedItems[index] = { ...updatedItems[index], [name]: value };
    if (name == "price" || name == "quantity") {
      if (name == "price")
        updatedItems[index].amount = value * updatedItems[index].quantity;
      else updatedItems[index].amount = updatedItems[index].price * value;
    }
    // console.log(updatedItems);
    setItems(updatedItems);
  };

  const addItem = () => {
    setItems([...items, { itemName: "", price: 0, quantity: 1, amount: 0 }]);
  };

  const removeItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  const totalAmount = () => {
    return items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  const calculateTotal = () => {
    
    const discountAmount =
      (invoiceDetails.discount / 100) * totalAmount();
    return totalAmount() - discountAmount;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsHidden(false);
    setMainData({
      invoiceDetails,
      items: items,
      total: totalAmount(),
      afterDiscount: calculateTotal()
    });
  };

  return (
    <>
      {isHidden ? (
        <>
          <div className="p-6 max-w-3xl mx-auto">
            <h1 className="text-3xl font-semibold mb-6">Invoice Generator</h1>

            {/* Invoice Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium">Bill Date</label>
                  <input
                    type="date"
                    name="billDate"
                    value={invoiceDetails.billDate}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">
                    Invoice Number
                  </label>
                  <input
                    type="text"
                    name="invoiceNumber"
                    value={invoiceDetails.invoiceNumber}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium">
                    Customer Name
                  </label>
                  <input
                    type="text"
                    name="customerName"
                    value={invoiceDetails.customerName}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">
                    Shopkeeper Name
                  </label>
                  <input
                    type="text"
                    name="shopkeeperName"
                    value={invoiceDetails.shopkeeperName}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  />
                </div>
              </div>

              {/* Items Table */}
              <h3 className="text-xl font-semibold mt-6 mb-2">Items</h3>
              <table className="w-full table-auto border-collapse border border-gray-300">
                <thead>
                  <tr>
                    <th className="border border-gray-300 px-4 py-2">
                      Item Name
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Price (INR)
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Quantity
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Subtotal
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => (
                    <tr key={index}>
                      <td className="border border-gray-300 px-4 py-2">
                        <input
                          type="text"
                          name="itemName"
                          value={item.itemName}
                          onChange={(e) => handleItemChange(e, index)}
                          className="w-full p-2 border border-gray-300 rounded"
                          required
                        />
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <input
                          type="number"
                          name="price"
                          value={item.price}
                          onChange={(e) => handleItemChange(e, index)}
                          className="w-full p-2 border border-gray-300 rounded"
                          min="0"
                          required
                        />
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <input
                          type="number"
                          name="quantity"
                          value={item.quantity}
                          onChange={(e) => handleItemChange(e, index)}
                          className="w-full p-2 border border-gray-300 rounded"
                          min="1"
                          required
                        />
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <input
                          type="number"
                          name="amount"
                          value={(item.price * item.quantity).toFixed(2)}
                          onChange={(e) => handleItemChange(e, index)}
                          className="w-full p-2 border border-gray-300 rounded"
                          min="1"
                          required
                        />
                        {/* ₹{} */}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <button
                          type="button"
                          onClick={() => removeItem(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <button
                type="button"
                onClick={addItem}
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
              >
                Add Item
              </button>

              {/* Discount and Total */}
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium">
                    Total Amount
                  </label>
                  <input
                    type="text"
                    readOnly
                    value={`₹${totalAmount().toFixed(2)}`}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    min="0"
                    max="100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">
                    Discount (%)
                  </label>
                  <input
                    type="number"
                    name="discount"
                    value={invoiceDetails.discount}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    min="0"
                    max="100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">
                    Total After Discount
                  </label>
                  <input
                    type="text"
                    readOnly
                    value={`₹${calculateTotal().toFixed(2)}`}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="mt-6 bg-green-500 text-white py-2 px-4 rounded"
              >
                Submit Invoice
              </button>
            </form>
          </div>
        </>
      ) : (
        <>
          <Bill mainData={mainData} />
        </>
      )}
    </>
  );
}

export default Invoice;
