import 'react-toastify/dist/ReactToastify.css';

import { Box, Modal } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';
import { PencilSimple, Trash } from 'phosphor-react';
import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

import VendorForm from '@/components/VendorForm';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  borderRadius: '8px',
  boxShadow: 24,
  p: 4,
};

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

const Dashboard = () => {
  const { push } = useRouter();
  const notify = () => toast('Logged out Successfully!');
  const [isCreate, setIsCreate] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [vendorData, setVendorData] = useState<IVendorForm[]>([
    {
      id: '1',
      name: 'Test',
      accountNo: 123,
      bankName: 'ICICI',
      addressLine1: 'string',
      addressLine2: 'string',
      city: 'string',
      country: 'string',
      pinCode: 422002,
    },
  ]);
  const [currentVendorIndex, setCurrentVendorIndex] = useState<number>(-1);
  const [update, setUpdate] = useState(false);

  const handleLogout = () => {
    sessionStorage.clear();
    notify();
    push('/');
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && !sessionStorage.getItem('token')) {
      push('/');
    }
  }, []);

  useEffect(() => {
    setToken(sessionStorage.getItem('token'));
    axios
      .get('https://js-tiger-server.onrender.com/v1/vendor', {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      })
      .then((response) => {
        setVendorData(response.data.data);
      })
      .catch((err) => console.error(err));
  }, [update]);

  return (
    <Main meta={<Meta title="Dashboard" description="js-tiger vendor details" />}>
      <div className="h-screen w-screen overflow-x-auto p-16">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th>Sr no.</th>
              <th>Name</th>
              <th>Bank Account No.</th>
              <th>Bank Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {vendorData.map((vendor, index) => {
              return (
                <tr key={vendor.id}>
                  <th>{index + 1}</th>
                  <td>{vendor.name}</td>
                  <td>{vendor.accountNo}</td>
                  <td>{vendor.bankName}</td>
                  <td>
                    <button
                      className="btn-outline btn-info btn-square btn mr-2"
                      onClick={() => {
                        setIsEdit(true);
                        setCurrentVendorIndex(index);
                      }}
                    >
                      <PencilSimple size={24} />
                    </button>

                    <button
                      className="btn-outline btn-error btn-square btn"
                      onClick={() => {
                        setIsDelete(true);
                        setCurrentVendorIndex(index);
                      }}
                    >
                      <Trash size={24} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <button
          className="btn-primary btn mr-4"
          onClick={() => setIsCreate(true)}
        >
          Create Vendor
        </button>
        <button className="btn-error btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <Modal
        open={isCreate}
        onClose={() => setIsCreate(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h1 className="text-4xl font-bold text-black">Vendor details</h1>
          <VendorForm
            token={token}
            data={undefined}
            onClose={() => {
              setIsCreate(false);
              setUpdate((prevVal) => !prevVal);
            }}
          />
        </Box>
      </Modal>
      <Modal
        open={isEdit}
        onClose={() => setIsEdit(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h1 className="text-4xl font-bold text-black">Vendor details</h1>
          <VendorForm
            token={token}
            data={vendorData[currentVendorIndex]}
            onClose={() => {
              setIsEdit(false);
              setUpdate((prevVal) => !prevVal);
            }}
          />
        </Box>
      </Modal>
      <Modal
        open={isDelete}
        onClose={() => setIsDelete(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h1 className="text-4xl font-bold text-black">Are you sure?</h1>
          <p className="py-6 text-black">You wish to delete this Vendor</p>
          <div className="btn-group">
            <button
              className="btn-active btn"
              onClick={() => {
                axios
                  .delete(
                    `https://js-tiger-server.onrender.com/v1/vendor/${vendorData[currentVendorIndex]?.id}`,
                    {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    }
                  )
                  .then(() => {
                    setUpdate((prevVal) => !prevVal);
                    setIsDelete(false);
                  })
                  .catch((err) => console.error(err));
              }}
            >
              Delete
            </button>
            <button className="btn" onClick={() => setIsDelete(false)}>
              Cancel
            </button>
          </div>
        </Box>
      </Modal>
      <ToastContainer position="bottom-center" />
    </Main>
  );
};

export default Dashboard;
