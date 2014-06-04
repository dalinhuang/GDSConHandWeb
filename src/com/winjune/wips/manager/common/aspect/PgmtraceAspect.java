package com.winjune.wips.manager.common.aspect;

import org.apache.log4j.Logger;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;

/* 
 * To enable AspectJ, we need aspectjrt.jar, aspectjweaver.jar and spring-aop.jar.
 *
 * In Spring AOP, 5 type of advices are supported (Common AspectJ annotations):
 * 	@Before – Run before the method execution
 * 	@After – Run after the method returned a result
 * 	@AfterReturning – Run after the method returned a result, intercept the returned result as well.
 * 	@AfterThrowing – Run after the method throws an exception
 * 	@Around – Run around the method execution, combine all three advices above.
 */
@Aspect
public class PgmtraceAspect {
	private static final Logger logger = Logger.getLogger(PgmtraceAspect.class);

	@Before("execution(* com.winjune.wips.manager..*.*(..))")
	// @Before("execution(* com.winjune.wips.manager.system.user.UserAction.execute(..))")
	public void logBefore(JoinPoint jp) {
		logger.info("Invoking method: "
				+ jp.getTarget().getClass().getName() + "."
				+ jp.getSignature().getName());
	}

	/*
	 * //@After("execution(* com.winjune.wips.manager..*.*(..))")
	 * 
	 * @After("execution(* com.winjune.wips.manager.system.user.UserAction.load(..))"
	 * ) public void logAfter(JoinPoint jp) { logger.info("log Ending method: "
	 * + jp.getTarget().getClass().getName() + "." +
	 * jp.getSignature().getName()); }
	 */

	/*
	 * @AfterReturning("execution(* com.winjune.wips.manager.*(..))") public void
	 * logAfterReturning(JoinPoint jp, Throwable ex) {
	 * System.out.println("method " + jp.getTarget().getClass().getName() + "."
	 * + jp.getSignature().getName() + " throw exception");
	 * System.out.println(ex.getMessage()); }
	 * 
	 * @Around("execution(* com.winjune.wips.manager.*(..))") public Object
	 * logAround(ProceedingJoinPoint pjp) throws Throwable { long time =
	 * System.currentTimeMillis();
	 * 
	 * Object retVal = pjp.proceed();
	 * 
	 * time = System.currentTimeMillis() - time;
	 * 
	 * logger.info("process time: " + time + " ms, " +
	 * pjp.getTarget().getClass().getName() + "." +
	 * pjp.getSignature().getName());
	 * 
	 * return retVal; }
	 */
	/*
	 * //@AfterThrowing("execution(* com.winjune.wips.manager..*.*(..))")
	 * 
	 * @AfterThrowing(
	 * "execution(* com.winjune.wips.manager.system.user.UserAction.load(..))")
	 * public void logAfterThrowing(JoinPoint jp, Throwable ex) {
	 * logger.info("method " + jp.getTarget().getClass().getName() + "." +
	 * jp.getSignature().getName() + " throw exception");
	 * logger.info(ex.getMessage()); }
	 */
	/*
	 * private void sendEx(String ex) { //TODO 发送短信或邮件提醒 return; }
	 */
}
