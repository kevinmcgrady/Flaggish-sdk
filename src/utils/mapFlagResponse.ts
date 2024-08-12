import { Flag } from '@/types/Flag';

const mapFlagResponse = (flags: Flag[]) => {
  const flagMap = flags.map((flag) => {
    return {
      [flag.name.replace(/\s/g, '')]: flag.isToggled,
    };
  });

  return Object.assign({}, ...flagMap);
};

export { mapFlagResponse };
