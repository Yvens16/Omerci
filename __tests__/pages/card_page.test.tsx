import React from "react";
import { screen, waitFor } from '@testing-library/react';
import { customRender } from "../../test-utils";
import userEvent from "@testing-library/user-event";
import useFirebaseAuth from '../../firebase/useFirebaseAuth';
jest.mock("../../firebase/useFirebaseAuth");
import useFirestore from "../../firebase/useFirestore";
jest.mock("../../firebase/useFirestore.tsx")
import CardPage from '@pages/card/[cardId]';
let mockPush = jest.fn();
let mockQuery = {
  cardId: '1234',
  isrecipient: "false",
}
jest.mock('next/router', () => ({
  useRouter: () => ({
    query: mockQuery,
    push: mockPush,
  })
}));

const card = {
  uid: "1234",
  creatorId: "userId",
  creatorName: "Thomas",
  recipientName: "Yvens",
  title: "Yvens's farewell",
  hasCagnotte: false,
  isPremium: false,
  teamName: "Compta",
  photoUrl: '/avatars/girl.jpg',
  isSent: false,
  cardUrl: "card/1234",
  creationDate: "7 avril 2022 à 12:27:17 UTC+2",
  WhoHasAlreadySeenOnce: [],
}


const messageText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ultricies ac gravida ante neque, vestibulum arcu, viverra. Eu arcu dui nisi semper. Commodo ";
const messages = [{
  uid: "messageId",
  cardId: "1234",
  messageText: messageText,
  ownerName: "Admin",
  createdDate: "7 avril 2022 à 12:27:17 UTC+2",
  creatorId: "userId",
  mediaUrl: "https://media.giphy.com/media/l0HlL2Z9gAJ6ve9sk/giphy.gif"
}, {
  uid: "messageId2",
  cardId: "1234",
  messageText: messageText,
  ownerName: "Not Admin",
  createdDate: "7 avril 2022 à 12:27:17 UTC+2",
  creatorId: "4321",
  mediaUrl: "https://media.giphy.com/media/FizSVay8SBrEI/giphy.gif"
},
];

let mockMessages = jest.fn().mockResolvedValue(messages);
const mockGetCard = jest.fn().mockResolvedValue(card);
const seenCard = {
  uid: "1234",
  creatorId: "userId",
  creatorName: "Thomas",
  recipientName: "Yvens",
  title: "Yvens's farewell",
  hasCagnotte: false,
  isPremium: false,
  teamName: "Compta",
  photoUrl: '',
  isSent: false,
  cardUrl: "card/1234",
  creationDate: "7 avril 2022 à 12:27:17 UTC+2",
  WhoHasAlreadySeenOnce: ["userId"],
  messagesId: [],
}
const mockGetCard2 = jest.fn().mockResolvedValue(seenCard);

afterEach(() => {
  jest.clearAllMocks();
})

afterAll(() => {
  jest.clearAllMocks();
});


const mockDeleteMessage = jest.fn();
const mockedUsedFirebaseAuth = (useFirebaseAuth as jest.Mock).mockImplementation(() => {
  return {
    authUser: {
      uid: "1234",
    }
  }
});

const mockedUsedFirestore = (useFirestore as jest.Mock).mockImplementation(() => {
  return {
    getCard: mockGetCard,
    updateCard: jest.fn(),
    getCards: jest.fn(),
    getMessagesOnCard: mockMessages
  }
});

//####################################################################################################################################
test("Checker que le recipient a dans Card_Params le text 'De la part de', le boutton Répondre à tous, Autres options", async() => {
  mockQuery.isrecipient = "true";
  mockedUsedFirebaseAuth.mockImplementation(() => {
    return {
      authUser: {
        uid: "recipientId",
      }
    }
  });
  mockedUsedFirestore.mockImplementation(() => {
    return {
      getCard: mockGetCard,
      updateCard: jest.fn(),
      getCards: jest.fn(),
      getMessagesOnCard: mockMessages
    }
  });
  customRender(<CardPage/>);
  const adminMessages = screen.queryAllByTestId("more_icon");
  expect(adminMessages).toHaveLength(0);
  const otherMessages = screen.queryAllByTestId("trash_icon");
  expect(otherMessages).toHaveLength(0);
  await waitFor(() => {
    expect(screen.getByText(/De la part de :/)).toBeInTheDocument();
  })
  expect(screen.getByText("Répondre à tous")).toBeInTheDocument();
  expect(screen.getByText("Autre options")).toBeInTheDocument();
});

//####################################################################################################################################
test("User sees the card for the first time so the onboarding modal shows itsel", async () => {
  mockedUsedFirebaseAuth.mockImplementation(() => {
    return {
      authUser: {
        uid: "1234",
      }
    }
  });
  mockedUsedFirestore.mockImplementation(() => {
    return {
      getCard: mockGetCard,
      updateCard: jest.fn(),
      getCards: jest.fn(),
      getMessagesOnCard: mockMessages
    }
  });
  const user = userEvent.setup();
  customRender(<CardPage />);
  await waitFor(() => {
    expect(screen.getByText(/Vous avez été invitez à participez une carte virtuelle crée par/)).toBeInTheDocument();
  })
  const comprisButton = screen.getByText("Compris");
  await user.click(comprisButton);
  await waitFor(() => {
    expect(screen.queryByText(/Vous avez été invitez à participez une carte virtuelle crée par/)).not.toBeInTheDocument();
  })
  const AddMessageBtnCardParams = screen.getAllByText("Ajouter un message")[0];
  const AddMessageBtnCardMsg = screen.getAllByText("Ajouter un message")[1];
  await user.click(AddMessageBtnCardParams);
  expect(mockPush).toHaveBeenCalledWith("/create_message");
  await user.click(AddMessageBtnCardMsg);
  expect(mockPush).toHaveBeenCalledWith("/create_message");
});

//####################################################################################################################################


test("Rights on the messages of the Admin and the participant", async () => {
  mockedUsedFirestore.mockImplementation(() => {
    return {
      getCard: mockGetCard,
      updateCard: jest.fn(),
      getCards: jest.fn(),
      getMessagesOnCard: mockMessages
    }
  });
  mockedUsedFirebaseAuth.mockImplementation(() => {
    return {
      authUser: {
        uid: "userId",
      }
    }
  });
  customRender(<CardPage />);

  const adminMessages = await screen.findAllByTestId("more_icon");
  expect(adminMessages[0]).toBeInTheDocument();
  const otherMessages = await screen.findAllByTestId("trash_icon");
  expect(otherMessages[0]).toBeInTheDocument();
})

test("User modifyThe his message", async () => {
  const user = userEvent.setup();
  mockedUsedFirestore.mockImplementation(() => ({
    getCard: mockGetCard,
    updateCard: jest.fn(),
    getCards: jest.fn(),
    getMessagesOnCard: mockMessages,
    deleteMessage: mockDeleteMessage,
  }))
  mockedUsedFirebaseAuth.mockImplementation(() => {
    return {
      authUser: {
        uid: "4321",
      }
    }
  })

  customRender(<CardPage />);
  const participantMessages = await screen.findAllByTestId("more_icon");
  expect(participantMessages[0]).toBeInTheDocument();
  user.click(participantMessages[0]);
  const modifyButton = await screen.findByText("Modifier mon message");
  await user.click(modifyButton);
  expect(mockPush).toHaveBeenCalledWith({
    pathname: `/create_card/[pid]?modify=true`,
    query: { pid: "messageId2" }
  })
  const openDeleteModale = screen.getByText("Supprimer mon message");
  await user.click(openDeleteModale);
  const DeleteMessageModal = screen.getByText("Êtes-vous sûr de vouloir supprimer ce message ?")
  expect(DeleteMessageModal).toBeInTheDocument();
  const deleteButton = screen.getByText("Supprimer");
  await user.click(deleteButton);
  expect(mockDeleteMessage).toHaveBeenCalledWith("messageId2");
  expect(DeleteMessageModal).not.toBeInTheDocument();
})


//####################################################################################################################################


test("User visit the second time so the Onboarding modal doesn't show itself", async () => {
  mockedUsedFirebaseAuth.mockImplementation(() => {
    return {
      authUser: {
        uid: "userId",
      },
    }
  });
  mockedUsedFirestore.mockImplementation(() => {
    return {
      getCard: mockGetCard2,
    }
  });
  customRender(<CardPage />);
  await waitFor(() => {
    expect(screen.queryByText(/Vous avez été invitez à participez une carte virtuelle crée par/)).not.toBeInTheDocument();
  })
});


//####################################################################################################################################

test("Creator of the card sees the icon params in CardParams on the left of the screen", async () => {
  mockedUsedFirebaseAuth.mockImplementation(() => {
    return {
      authUser: {
        uid: "userId",
      }
    }
  });
  mockedUsedFirestore.mockImplementation(() => {
    return {
      getCard: mockGetCard2,
    }
  })
  const user = userEvent.setup();
  customRender(<CardPage />);
  await waitFor(() => {
    expect(screen.getByTestId("settings")).toBeInTheDocument()
  });
});


//####################################################################################################################################

test("Participant doesn't see the params icon because not creator of card", async () => {
  mockedUsedFirebaseAuth.mockImplementation(() => {
    return {
      authUser: {
        uid: "notUserId",
      }
    }
  });
  mockedUsedFirestore.mockImplementation(() => {
    return {
      getCard: mockGetCard2,
      updateCard: jest.fn(),
    }
  })
  customRender(<CardPage />);
  await waitFor(() => {
    expect(screen.queryByTestId("settings")).not.toBeInTheDocument()
  });
})


//####################################################################################################################################
