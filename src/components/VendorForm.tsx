import axios from 'axios';
import React from 'react';

import useForm from './useForm';

interface IVendorForm {
  id: string;
  name: string;
  accountNo: number;
  bankName: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  country: string;
  pinCode: number;
}

const VendorForm: React.FC<{
  data: IVendorForm | undefined;
  token: string | null;
  onClose: () => void;
}> = ({ data, token, onClose }) => {
  const initialValue = data ?? {
    name: '',
    accountNo: '',
    bankName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    country: '',
    pinCode: '',
  };

  const { values, handleChange } = useForm(initialValue);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (data) {
      axios
        .patch(`http://localhost:5000/v1/vendor/${data.id}`, values, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log(response);
          onClose();
        })
        .catch((err) => console.error(err));
    } else {
      axios
        .post(`http://localhost:5000/v1/vendor`, values, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log(response);
          onClose();
        })
        .catch((err) => console.error(err));
    }
  };
  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Vendor name:</span>
        </label>
        <input
          type="text"
          placeholder="Enter vendor name"
          className="input-bordered input w-full"
          onChange={handleChange}
          name="name"
          value={values.name}
        />
      </div>
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Account No:</span>
        </label>
        <input
          type="number"
          placeholder="Enter bank account no."
          className="input-bordered input w-full"
          onChange={handleChange}
          name="accountNo"
          value={values.accountNo}
        />
      </div>
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Bank name:</span>
        </label>
        <input
          type="text"
          placeholder="Enter bank name"
          className="input-bordered input w-full"
          onChange={handleChange}
          name="bankName"
          value={values.bankName}
        />
      </div>
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Address Line 1:</span>
        </label>
        <input
          type="text"
          placeholder="Enter address line 1"
          className="input-bordered input w-full"
          onChange={handleChange}
          name="addressLine1"
          value={values.addressLine1}
        />
      </div>
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Address Line 2:</span>
        </label>
        <input
          type="text"
          placeholder="Enter address line 2"
          className="input-bordered input w-full"
          onChange={handleChange}
          name="addressLine2"
          value={values.addressLine2}
        />
      </div>
      <div className="flex flex-wrap items-center justify-between">
        <div className="form-control w-full sm:w-auto">
          <label className="label">
            <span className="label-text">City:</span>
          </label>
          <input
            type="text"
            placeholder="Enter city"
            className="input-bordered input w-full sm:w-40"
            onChange={handleChange}
            name="city"
            value={values.city}
          />
        </div>
        <div className="form-control w-full sm:w-auto">
          <label className="label">
            <span className="label-text">Country:</span>
          </label>
          <input
            type="text"
            placeholder="Enter country"
            className="input-bordered input w-full sm:w-40"
            onChange={handleChange}
            name="country"
            value={values.country}
          />
        </div>
        <div className="form-control w-full sm:w-auto">
          <label className="label">
            <span className="label-text">Zip code:</span>
          </label>
          <input
            type="number"
            placeholder="Enter zip code"
            className="input-bordered input w-full sm:w-32"
            onChange={handleChange}
            name="pinCode"
            value={values.pinCode}
          />
        </div>
      </div>
      <div className="ga mt-4 flex w-full justify-end gap-4">
        <button className="btn-primary btn-active btn" type="submit">
          Submit
        </button>
        <button className="btn-error btn" type="button" onClick={onClose}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default VendorForm;
