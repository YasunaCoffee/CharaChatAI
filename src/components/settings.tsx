import React from "react";
import { IconButton } from "./iconButton";
import { TextButton } from "./textButton";
import { Message } from "@/features/messages/messages";
import {
  KoeiroParam,
  PRESET_A,
  PRESET_B,
  PRESET_C,
  PRESET_D,
} from "@/features/constants/koeiroParam";
import { Link } from "./link";

type SettingsProps = {
  systemPrompt: string;
  chatLog: Message[];
  koeiroParam: KoeiroParam;
  onClickClose: () => void;
  onChangeSystemPrompt: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onChangeChatLog: (index: number, text: string) => void;
  onChangeKoeiroParam: (x: number, y: number) => void;
  onClickOpenVrmFile: () => void;
  onClickResetChatLog: () => void;
  onClickResetSystemPrompt: () => void;
};

export const Settings = ({
  systemPrompt,
  chatLog,
  koeiroParam,
  onClickClose,
  onChangeSystemPrompt,
  onChangeChatLog,
  onChangeKoeiroParam,
  onClickOpenVrmFile,
  onClickResetChatLog,
  onClickResetSystemPrompt,
}: SettingsProps) => {
  // The rest of the component implementation remains the same...
};
