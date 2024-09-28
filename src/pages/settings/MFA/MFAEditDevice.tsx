import React, { SetStateAction, useRef, useState } from "react";

import SvgClose from "assets/icons/SvgClose";
import SvgDelete from "assets/icons/SvgDelete";
import SvgDots from "assets/icons/SvgDots";
import SvgEdit from "assets/icons/SvgEdit";

import MFAButtonIcon from "src/components/buttons/mfaBtn/MFAButtonIcon";
import Loader from "src/components/loaders/generalLoader/Loader";
import GeneralModal, { GeneralModalContent } from "src/components/modals/generalModal/GeneralModal";

import { IDevice, MFA_METHODS } from "src/utils/interfaces/auth/IMFA";

import { SuccessType } from "../Settings";

type DeviceProps = {
  device: IDevice;
  devicesForAuthentications: IDevice[];
  setDevicesForAuthentications: React.Dispatch<SetStateAction<IDevice[]>>;
  setShowSuccessModal: React.Dispatch<SetStateAction<boolean>>;
  setShowErrorModal: React.Dispatch<SetStateAction<boolean>>;
  setErrorSubMsg: React.Dispatch<SetStateAction<string>>;
  setSuccessType: React.Dispatch<SetStateAction<SuccessType>>;
  loadingStep: boolean;
  setLoadingStep: React.Dispatch<SetStateAction<boolean>>;
  selectDevice: () => void;
};

export default function MFAEditDevice({
  device,
  devicesForAuthentications,
  setDevicesForAuthentications,
  selectDevice,
  setShowSuccessModal,
  setShowErrorModal,
  loadingStep,
  setLoadingStep,
  setSuccessType,
}: DeviceProps) {
  const [editMode, setEditMode] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const deleteBtn = useRef<HTMLButtonElement>(null);

  const deleteMethodModalContent: GeneralModalContent = {
    header: `Delete ${MFA_METHODS[device.type].heading} Method`,
    message: `Are you sure you want to delete this method? This action can't be undone.`,
    actionBtn: { label: "Delete method", action: (e) => handleDelete(e) },
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    setLoadingStep(true);
    setTimeout(() => {
      setLoadingStep(false);
      setShowSuccessModal(true);
      setSuccessType("DELETE_MFA_DEVICE");
      let updatedDeviceList = devicesForAuthentications.filter(
        (deviceForAuth) => deviceForAuth.id !== device.id,
      );
      setDevicesForAuthentications(updatedDeviceList);
    }, 1000);
    setShowConfirmModal(false);
  };

  const handleCloseModal = () => {
    setShowConfirmModal(false);
    deleteBtn.current?.focus();
  };

  const handleAction = (action: "EDIT" | "DELETE") => {
    if (action === "DELETE") {
      setShowConfirmModal(true);
    } else {
      selectDevice();
    }
  };

  return (
    <div className={`device-row ${editMode ? "open" : "closed"}`}>
      {loadingStep && <Loader />}
      <div className="device-data">
        <MFAButtonIcon method={device.type} />
        <p>
          {MFA_METHODS[device.type].heading}
          {MFA_METHODS[device.type].heading !== "Authenticator app" && (
            <span className={editMode ? "isEditing" : ""}>: {device.email || device.phone}</span>
          )}
        </p>
      </div>
      <div className="device-btn-group">
        {!editMode ? (
          <button
            className="btn-nest ghost edit-btn"
            onClick={() => setEditMode(true)}
            title="Open device options"
          >
            <SvgDots orientation="VERTICAL" />
          </button>
        ) : (
          <>
            <button
              className={
                devicesForAuthentications.length === 1
                  ? "btn-nest ghost disabled"
                  : "btn-nest ghost"
              }
              onClick={() => handleAction("DELETE")}
              ref={deleteBtn}
              disabled={devicesForAuthentications.length === 1 ? true : false}
            >
              <SvgDelete /> Delete
            </button>

            <button
              className={
                devicesForAuthentications.length === 5
                  ? "btn-nest ghost disabled"
                  : "btn-nest ghost"
              }
              onClick={() => handleAction("EDIT")}
              disabled={devicesForAuthentications.length === 5 ? true : false}
            >
              <SvgEdit /> Edit
            </button>

            <button className="btn-nest ghost" onClick={() => setEditMode(false)}>
              <SvgClose /> Close
            </button>
          </>
        )}
      </div>
      <GeneralModal
        showModal={showConfirmModal}
        closeModal={handleCloseModal}
        modalContent={deleteMethodModalContent}
      />
    </div>
  );
}
