import { html } from "@dependable/view";
import { css } from "stylewars";
import { Comment } from "./Comment.js";
import { Answers } from "./Answers.js";
import { BackButton } from "./BackButton.js";

const containerStyles = css`
  & {
    margin: 0 auto;
    width: 90vw;
    box-sizing: border-box;
    max-width: 800px;
  }
`;

const itemStyles = css`
  & {
    background: white;
    padding: 20px;
    border-radius: 4px;
  }
`;

const answerStyles = css`
  & {
    padding-top: 25px;
    padding-left: 15px;
  }
`;

export class CommentAndAnswers {
  render({ comment }) {
    return html`
      <div className=${containerStyles}>
        <div className=${itemStyles}>
          <${Comment} comment=${comment} />
          <div className=${answerStyles}>
            <${Answers} comment=${comment} />
          </div>
          <${BackButton} />
        </div>
      </div>
    `;
  }
}
