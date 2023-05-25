import { map } from 'lodash';

export type SafeCrossingEventSeverity =
  | 0 // 기본값
  | 1 // 매우 낮음
  | 2 // 낮음
  | 3 // 보통
  | 4 // 높음
  | 5; // 매우 높음

export const SafeCrossingEventSeverity = {
  toList: (): SafeCrossingEventSeverity[] => [0, 1, 2, 3, 4, 5],
  toKoreanList: (): string[] =>
    map(SafeCrossingEventSeverity.toList(), SafeCrossingEventSeverity.toKorean),
  toEnglishList: (): string[] =>
    map(
      SafeCrossingEventSeverity.toList(),
      SafeCrossingEventSeverity.toEnglish,
    ),
  isValid: (severity: number): severity is SafeCrossingEventSeverity =>
    [0, 1, 2, 3, 4, 5].includes(severity),
  toKorean: (severity: SafeCrossingEventSeverity): string => {
    const switchCase: Record<SafeCrossingEventSeverity, string> = {
      0: '-',
      1: '매우 낮음',
      2: '낮음',
      3: '보통',
      4: '높음',
      5: '매우 높음',
    };

    return switchCase[severity];
  },
  fromKorean: (severity: string): SafeCrossingEventSeverity => {
    const switchCase: Record<string, SafeCrossingEventSeverity> = {
      '-': 0,
      '매우 낮음': 1,
      낮음: 2,
      보통: 3,
      높음: 4,
      '매우 높음': 5,
    };

    return switchCase[severity];
  },
  toEnglish: (severity: SafeCrossingEventSeverity): string => {
    const switchCase: Record<SafeCrossingEventSeverity, string> = {
      0: '-',
      1: 'Very Low',
      2: 'Low',
      3: 'Normal',
      4: 'High',
      5: 'Very High',
    };

    return switchCase[severity];
  },
  fromEnglish: (severity: string): SafeCrossingEventSeverity => {
    const switchCase: Record<string, SafeCrossingEventSeverity> = {
      '-': 0,
      'Very Low': 1,
      Low: 2,
      Normal: 3,
      High: 4,
      'Very High': 5,
    };

    return switchCase[severity];
  },
};
