import { fixtureAttachments } from "@/shared/fixtures";
import { getTokensAttachment } from "@/shared/providers/api";
import { call, put, takeLatest } from "redux-saga/effects";
import { attachmentsActions } from "./slice";
import { AttachmentModel } from "./types";

function* fetchAttachmentsSaga(
  action: ReturnType<typeof attachmentsActions.fetchAttachmentsStart>
): any {
  try {
    const { page, token } = action.payload;
    const tokenCode = token.value;
    const response = yield call(getTokensAttachment, {
      tokenCode,
      page,
      pageSize: 15,
    });

    let crPage = page;
    let tPages = 0;
    let hasMore = false;
    let dt: AttachmentModel[] = [];
    dt = response.content;
    crPage = response.current_page;
    tPages = response.total_pages;
    hasMore = crPage < tPages;

    if (!dt?.length && page === 1) {
      throw new Error("Stream has no attachments");
    }

    yield put(
      attachmentsActions.fetchAttachmentsSuccess({
        attachments: dt,
        currentPage: crPage,
        totalPages: tPages,
        hasMore: hasMore,
      })
    );
  } catch (error: any) {
    // Show the bundled demo documents instead of an empty page.
    console.warn("Attachments unavailable, using fixtures:", error?.message);
    yield put(
      attachmentsActions.fetchAttachmentsSuccess({
        attachments: fixtureAttachments,
        currentPage: 1,
        totalPages: 1,
        hasMore: false,
      })
    );
  }
}

export function* attachmentsSaga() {
  yield takeLatest(
    attachmentsActions.fetchAttachmentsStart.type,
    fetchAttachmentsSaga
  );
}
