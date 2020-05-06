import { StyleSheet } from 'react-native';
import { SPACING, FONT_FAMILY, FONT_SIZE, COLOR } from '../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: SPACING.MEDIUM,
    backgroundColor: COLOR.BACKGROUND,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR.BACKGROUND,
  },
  title: {
    fontFamily: FONT_FAMILY.BOLD,
    fontSize: FONT_SIZE.EXTRA_EXTRA_LARGE,
    color: '#1D2226',
  },
  subTitle: {
    fontFamily: FONT_FAMILY.REGULAR,
    fontSize: FONT_SIZE.LARGE,
    color: '#1D2226',
    opacity: 0.6,
    marginBottom: SPACING.EXTRA_LARGE,
  },
  text: {
    fontFamily: FONT_FAMILY.LIGHT_ITALIC,
    fontSize: FONT_SIZE.LARGE,
  },
});
