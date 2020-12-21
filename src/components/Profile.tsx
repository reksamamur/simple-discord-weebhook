import React, { useState } from "react";
import "../App.css";
import Modal from "react-modal";

interface Props {
  hookName: string;
  hookChannelId: string;
}

const customStyles = {
  content: {
    top: "30%",
    bottom: "30%",
    left: "20%",
    right: "20%",
  },
};

Modal.setAppElement("#root");
const Profile: React.FC<Props> = ({ hookName, hookChannelId }) => {
  const [modal, setModal] = useState(false);

  const [tempHookName, setTempHookName] = useState<string>("");
  const [tempHookAvatar, setTempHookAvatar] = useState<string>("");
  const [tempHookChannelId, setTempHookChannelId] = useState<string>("");

  return (
    <div>
      <div>
        <article>
          <div>
            <h2 className="text-lg font-semibold text-black mb-0.5">
              {hookName}
            </h2>
            <dl className="flex flex-wrap text-sm font-medium whitespace-pre">
              <div className="flex-none w-full mt-0.5 font-normal">
                <dt className="inline">Channel id: </dt>{" "}
                <dd className="inline text-black">{hookChannelId}</dd>
              </div>
            </dl>
            <button
              onClick={() => setModal(true)}
              className="mt-5 mx-auto py-1 px-5 rounded-md border border-gray-300"
            >
              Edit
            </button>
          </div>
        </article>
        <Modal style={customStyles} isOpen={modal}>
          <h1 className="flex-auto text-xl font-semibold">Edit WebHook</h1>
          <form className="relative">
            <div className="mt-5">
              <label
                htmlFor="weebhook_name"
                className="tracking-tight font-medium text-black"
              >
                Webhook Name
              </label>
              <input
                onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
                  setTempHookName(ev.target.value)
                }
                name="weebhook_name"
                type="text"
                defaultValue={hookName}
                placeholder="Webhook name"
                className="focus:border-light-blue-500 focus:ring-1 focus:ring-light-blue-500 focus:outline-none w-full text-sm text-black placeholder-gray-500 border border-gray-200 rounded-md py-3 pl-5"
              />
            </div>

            <div className="mt-3">
              <label
                htmlFor="weebhook_channel_id"
                className="tracking-tight font-medium text-black"
              >
                Webhook Channel Id
              </label>
              <input
                onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
                  setTempHookChannelId(ev.target.value)
                }
                name="weebhook_channel_id"
                type="text"
                defaultValue={hookChannelId}
                placeholder="Webhook Channel"
                className="focus:border-light-blue-500 focus:ring-1 focus:ring-light-blue-500 focus:outline-none w-full text-sm text-black placeholder-gray-500 border border-gray-200 rounded-md py-3 pl-5"
              />
            </div>
            <div className="mt-3">
              <label
                htmlFor="weebhook_avatar"
                className="tracking-tight font-medium text-black"
              >
                Webhook Avatar URL
              </label>
              <input
                onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
                  setTempHookAvatar(ev.target.value)
                }
                name="weebhook_avatar"
                type="text"
                placeholder="Webhook Avatar"
                className="focus:border-light-blue-500 focus:ring-1 focus:ring-light-blue-500 focus:outline-none w-full text-sm text-black placeholder-gray-500 border border-gray-200 rounded-md py-3 pl-5"
              />
            </div>
          </form>
          <div className="mt-5 flex-auto flex space-x-3">
            <button
              onClick={() => setModal(false)}
              className="py-1 px-5 items-center justify-center rounded-md border border-gray-300"
              type="button"
            >
              Cancel
            </button>
            <button
              className="py-1 px-5 items-center justify-center rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
              type="submit"
            >
              Save
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Profile;
