package com.winjune.wips.manager.common.util;

public class StringUtil {
	public static String generateRandomString(int lenght) {
		String chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

		String randstring = "";
		int min = 0;
		int max = chars.length() - 1;
		int randNumber;

		for (int i = 0; i < lenght; i++) {
			randNumber = RandomUtil.rand(min, max);
			randstring += chars.substring(randNumber, randNumber + 1);
		}

		return randstring;
	}
}
