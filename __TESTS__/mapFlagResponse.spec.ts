import { describe, expect,it } from 'vitest';

import { Flag } from '@/types/Flag';
import { mapFlagResponse } from '@/utils/mapFlagResponse';

const flags: Flag[] = [
  {
    name: 'Homepage Header',
    slug: 'homepage-header',
    isToggled: true,
  },
  {
    name: 'Homepage Footer',
    slug: 'homepage-footer',
    isToggled: false,
  },
  {
    name: 'Homepage Navigation',
    slug: 'homepage-navigation',
    isToggled: true,
  },
];

describe('mapFlagResponse', () => {
  it('should correctly map the flags', () => {
    const actual = mapFlagResponse(flags);

    const expected = {
      HomepageHeader: true,
      HomepageFooter: false,
      HomepageNavigation: true,
    };

    expect(actual).toEqual(expected);
  });
});
