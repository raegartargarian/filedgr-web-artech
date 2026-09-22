import { ModelDocumentation } from "@/shared/utils/zipHandler";
import { AttachmentModel } from "../attachments/types";

/** A node of the folder tree built from a code-repository zip attachment. */
export interface FileStructure {
  name: string;
  type: "file" | "folder";
  language?: string;
  code?: string;
  children?: FileStructure[];
}

export interface AttachmentDetailState {
  attachment: AttachmentModel | null;
  isLoading: boolean;
  error: string | null;
  contentType: "code" | "model-documentation" | null;
  fileStructure: FileStructure[] | null;
  modelDocumentation: ModelDocumentation | null;
}
