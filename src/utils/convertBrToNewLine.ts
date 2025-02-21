/**
 * HTML 문자열에서 <br> 태그를 줄바꿈 문자로 변환합니다.
 *
 * @param html HTML 문자열
 * @returns 줄바꿈 문자로 변환된 문자열
 */
export function convertBrToNewLine(html: string): string {
  return html.replace(/<br\s*\/?>/g, "\n");
}
