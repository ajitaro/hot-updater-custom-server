import semver from 'semver'
const semverSatisfies = (targetAppVersion: string, currentVersion: string) => {
  const currentCoerce = semver.coerce(currentVersion);
  if (!currentCoerce) {
    return false;
  }

  return semver.satisfies(currentCoerce.version, targetAppVersion);
};

export const filterCompatibleAppVersions = (
  targetAppVersionList: string[],
  currentVersion: string,
) => {
  const compatibleAppVersionList = targetAppVersionList.filter((version) =>
    semverSatisfies(version, currentVersion),
  );

  return compatibleAppVersionList.sort((a, b) => b.localeCompare(a));
};